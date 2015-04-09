metadataTool.controller('DocumentController', function ($scope, $timeout, DocumentPage, DocumentRepo, User, UserRepo, ngTableParams) {

	var view = window.location.pathname;
	
	var userRepo;
	
	var annotators = [];
	
	$scope.user = User.get();
	
	$scope.setTable = function() {
	
		$scope.tableParams = new ngTableParams({
	        page: 1,
	        count: 10,
	        sorting: {
	            filename: 'asc'
	        },
	        filter: {
	        	filename: '',
	            status: (view == '/metadatatool/assignments' || view == '/metadatatool/users') ? 'Assigned' : 'Open',
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
	                	}, 50);
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
		
	$scope.isAdmin = function() {
		if(sessionStorage.role == "ROLE_ADMIN") {
			return true;
		}
		return false;
	};
	
	$scope.isManager = function() {
		if(sessionStorage.role == "ROLE_MANAGER") {
			return true;
		}
		return false;
	};
	
	$scope.isAnnotator = function() {
		if(sessionStorage.role == "ROLE_ANNOTATOR") {
			return true;
		}
		return false;
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
	
	$scope.updateAnnotator = function(filename, status, annotator) {
		if(!annotator) {
			annotator = $scope.user.uin;
		}
		else {
			annotator = JSON.parse(annotator);
		}
		DocumentRepo.update(filename, annotator, status);		
	};

	DocumentPage.listen().then(null, null, function(data) {
		$scope.tableParams.reload();
	});
	
});
