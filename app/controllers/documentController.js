metadataTool.controller('DocumentController', function ($controller, $route, $scope, $timeout, $window, DocumentPage, DocumentRepo, User, UserRepo, ngTableParams) {

	angular.extend(this, $controller('AbstractController', {$scope: $scope}));
	
	var view = $window.location.pathname;
	
	var userRepo;
	
	var annotators = [];

	$scope.user = User.get();
	
	$scope.userRepo = UserRepo.get();

	$scope.selectedUser = null;

	User.ready().then(function() {		
		
		$scope.setTable = function() {
			$scope.tableParams = new ngTableParams({
		        page: 1,
		        count: 10,
		        sorting: {
		            name: 'asc'
		        },
		        filter: {
		        	name: '',
		        	status: (view == '/' + globalConfig.base + '/assignments' || view == '/' + globalConfig.base + '/users') ? 'Assigned' : (sessionStorage.role == 'ROLE_ANNOTATOR') ? 'Open' : '',
		            annotator: (view == '/' + globalConfig.base + '/assignments' || view == '/' + globalConfig.base + '/users') ? ($scope.selectedUser) ? $scope.selectedUser.uin : $scope.user.uin : ''
		        }
		    }, {
		        total: 0,
		        getData: function($defer, params) {		        	
		        	var key; for(key in params.sorting()) {}

		        	var filter = params.filter();

		        	console.log(filter);

					DocumentPage.get(params.page(), params.count(), key, params.sorting()[key], filter).then(function(data) {
		        		var page = JSON.parse(data.body).content.PageImpl;
		        		params.total(page.totalElements);
		        		$scope.docs = page.content;
		        		$defer.resolve($scope.docs);
		        	});
 	
		        }
		    });		
		};		
		$scope.setTable();
	});

	$scope.setSelectedUser = function(user) {
		$scope.selectedUser = user;
		$scope.setTable();
	};
	
	$scope.availableAnnotators = function() {
		if(!userRepo) {
			userRepo = UserRepo.get();
			for(var key in userRepo.list) {
				var user = userRepo.list[key];
				if(user.role == 'ROLE_ANNOTATOR' || user.role == 'ROLE_MANAGER') {
					annotators.push(user);
				}
			}
		}
		return annotators;
	};
	
	$scope.updateAnnotator = function(name, status, annotator) {

		if(!annotator) {
			annotator = $scope.user;
		}
		else {
			annotator = JSON.parse(annotator);
		}
		DocumentRepo.update(name, annotator, status);		
	};

	DocumentPage.listen().then(null, null, function(data) {
		$scope.tableParams.reload();
	});
	
	UserRepo.listen().then(null, null, function(data) {
		if(JSON.parse(data.body).content.HashMap.changedUserUin == $scope.user.uin) {
			$scope.user = User.get(true);
			$route.reload();
		}			
	});
	
});
