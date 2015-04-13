metadataTool.controller('DocumentController', function ($controller, $scope, $timeout, $window, DocumentPage, DocumentRepo, User, UserRepo, ngTableParams) {

	angular.extend(this, $controller('AbstractController', {$scope: $scope}));
	
	var view = $window.location.pathname;
	
	var userRepo;
	
	var annotators = [];
	
	$scope.user = User.get();
	
	$scope.setTable = function() {
	
		$scope.tableParams = new ngTableParams({
	        page: 1,
	        count: 10,
	        sorting: {
	            name: 'asc'
	        },
	        filter: {
	        	name: '',
	        	status: (view == '/metadatatool/assignments' || view == '/metadatatool/users') ? 'Assigned' : (sessionStorage.role == 'ROLE_ANNOTATOR') ? 'Open' : '',
	            annotator: (view == '/metadatatool/assignments' || view == '/metadatatool/users') ? ($scope.selectedUser) ? $scope.selectedUser.uin : $scope.user.uin : ''
	        }
	    }, {
	        total: 0,
	        getData: function($defer, params) {
	        	
	        	var key; for(key in params.sorting()) {}
	        	
	        	if(view == '/metadatatool/assignments' || view == '/metadatatool/users') {
	        		if(!params.filter().annotator) {
	            		$timeout(function() {
	            			params.filter().annotator = ($scope.selectedUser) ? $scope.selectedUser.uin : $scope.user.uin;
	            		}, 250);
	            	}
	        	}

	        	DocumentPage.get(params.page(), params.count(), key, params.sorting()[key], params.filter()).then(function(data) {
	        		var page = JSON.parse(data.body).content.PageImpl;
	        		params.total(page.totalElements);
	        		$scope.docs = page.content;
	        		$defer.resolve($scope.docs);
	        	});
	        	
	        }
	    });
	
	};
		
	$scope.setTable();
	
	$scope.$watch('selectedUser.uin', function() {		
		$scope.setTable();
	});
	
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
			annotator = $scope.user.uin;
		}
		else {
			annotator = JSON.parse(annotator);
		}
		DocumentRepo.update(name, annotator, status);		
	};
	
	$scope.reviewDocument = function(name) {
		console.log("Review " + name);
	}

	DocumentPage.listen().then(null, null, function(data) {
		$scope.tableParams.reload();
	});
	
});
