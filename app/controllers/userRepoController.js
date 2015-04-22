metadataTool.controller('UserRepoController', function ($controller, $location, $scope, $route, User, UserRepo) {
	
    angular.extend(this, $controller('AbstractController', {$scope: $scope}));
    
    $scope.user = User.get()

    $scope.userRepo = UserRepo.get();
     
    User.ready().then(function(){
    	
		$scope.updateRole = function(uin, role) {
			UserRepo.updateRole(uin, role);
			if($scope.user.uin == uin) {
				if(role == 'ROLE_ANNOTATOR') {
					$location.path('/assignments');
				}
				else if(role == 'ROLE_USER') {
					$location.path('/myview');
				}
				else {}
			}
		};
		
		$scope.allowableRoles = function(userRole) {
			if(sessionStorage.role == 'ROLE_ADMIN') {
				return ['ROLE_ADMIN','ROLE_MANAGER','ROLE_ANNOTATOR','ROLE_USER'];
			}
			else if(sessionStorage.role == 'ROLE_MANAGER') {
				if(userRole == 'ROLE_ADMIN') {
					return ['ROLE_ADMIN'];
				}
				return ['ROLE_MANAGER','ROLE_ANNOTATOR','ROLE_USER'];
			}
			else {
				return [userRole];
			}
		};
		
    });
	
});


