metadataTool.controller('DocumentController', function ($controller, $route, $scope, $window, DocumentRepo, UserService, UserRepo, ngTableParams) {

	angular.extend(this, $controller('AbstractController', {$scope: $scope}));
	
	var view = $window.location.pathname;
	
	$scope.user = UserService.getCurrentUser();

	$scope.users = UserRepo.getAll();

	$scope.selectedUser = null;

	$scope.setTable = function() {

		$scope.tableParams = new ngTableParams({
	        page: 1,
	        count: 10,
	        sorting: {
	            name: 'asc'
	        },
	        filter: {
	        	name: '',
	        	status: (view.indexOf('assignments') > -1 || view.indexOf('users') > -1) ? 'Assigned' : (sessionStorage.role == 'ROLE_ANNOTATOR') ? 'Open' : '',
	            annotator: (view.indexOf('assignments') > -1 || view.indexOf('users') > -1) ? ($scope.selectedUser) ? $scope.selectedUser.uin : $scope.user.uin : ''
	        }
	    }, {
	        total: 0,
	        getData: function($defer, params) {
	        	var key; for(key in params.sorting()) {}

        		DocumentRepo.page(params.page(), params.count(), key, params.sorting()[key], params.filter()).then(function(data) {
	        		var page = JSON.parse(data.body).payload.PageImpl;
	        		params.total(page.totalElements);
	        		$defer.resolve(page.content);
	        	});
				
	        }
	    });	

	};
	
	$scope.setTable();

	$scope.setSelectedUser = function(user) {
		$scope.selectedUser = user;
		$scope.setTable();
	};
	
	$scope.availableAnnotators = function() {
		var annotators = [];
		for(var key in $scope.users) {
			var user = $scope.users[key];
			if(user.role == 'ROLE_ANNOTATOR' || user.role == 'ROLE_MANAGER' || user.role == 'ROLE_ADMIN') {
				annotators.push(user);
			}
		}
		return annotators;
	};
	
	$scope.updateAnnotator = function(name, status, annotator) {
		annotator = !annotator ? $scope.user.firstName + " " + $scope.user.lastName + " (" + $scope.user.uin + ")" : annotator;
		DocumentRepo.update(name, status, annotator);
	};

	DocumentRepo.listen(function(data) {
		$scope.tableParams.reload();
	});
	
});
