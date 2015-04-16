metadataTool.controller('AdminController', function ($controller, $scope, $location, $route, $window, $http, User, UserRepo, Metadata, AuthServiceApi, WsApi) {
	
    angular.extend(this, $controller('AbstractController', {$scope: $scope}));
    
    $scope.user = User.get();
	
	$scope.userRepo = UserRepo.get();

	$scope.showModal = false;
	
	$scope.selectedUser = null;
	
	if(sessionStorage.assumedUser) {
		$scope.assume = JSON.parse(sessionStorage.assumedUser);
		$scope.assumeBtn = 'Unassume';
	} else {
		$scope.assumeBtn = 'Assume';
	}
	
	$scope.$watch('user.role', function() {		
		sessionStorage.role = $scope.user.role;
		if ($scope.user.role == 'ROLE_ADMIN') {
			$scope.admin = true;
		} 
		else if ($scope.user.role == 'ROLE_MANAGER') {
			$scope.admin = false;
		}
		else {
			$scope.admin = false;
		}
	});
	
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

	$scope.updateRole = function(uin, role) {
		UserRepo.updateRole(uin, role);
	}
	
	$scope.showAssignmentsModal = function(user) {
		$scope.selectedUser = user;
		$scope.showModal = !$scope.showModal;
	}
	
	$scope.isMocking = function() {
		if(globalConfig.mockRole) {
			return true;
		}
		else {
			return false;
		}
	};

	$scope.assumeUser = function(assume) {
		
		if(!sessionStorage.assumedUser) {
			if ((typeof assume !== 'undefined') && assume.netid) {				
				console.log("Assuming user");
				console.log(assume);
				sessionStorage.adminToken = sessionStorage.token;
								
				sessionStorage.assumedUser = JSON.stringify(assume);

				AuthServiceApi.getAssumedUser(assume).then(function(data) {
					if(data) {
						User.get("assume");
						
						$scope.assumeBtn = 'Unassume';
						$scope.assumeStatus = '';
						
						$scope.showModal = false;
						
						$window.location.reload();
						$location.path('/assignments');
						
					}
					else {
						$scope.assumeStatus = 'invalid netid';
						delete sessionStorage.assumedUser;
						$scope.assumeBtn = 'Assume';
					}
				});
			}
		} else {
			console.log("Unassuming user");

			sessionStorage.token = sessionStorage.adminToken;
			delete sessionStorage.assumedUser;

			User.get("unassume");

			$scope.assumeBtn = 'Assume';
			
			$location.path('/admin');
		}		
		
	};
	
	$scope.exportMetadata = function() {
		console.log("Export metadata");
		return Metadata.getAllPublished().then(function(metadata) {
			return  JSON.parse(metadata.body).content["ArrayList<ArrayList>"];
		});
	};

	$scope.sync = function() {
		console.log("Trying to sync");
		var syncPromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'document', 
				method: 'sync'
		});

		syncPromise.then(function(data) {
			console.log(data);
		});
	}
	
	UserRepo.listen().then(null, null, function(data) {
		if(JSON.parse(data.body).content.HashMap.changedUserUin = $scope.user.uin) {
			User.get(true);
			$route.reload();
		}			
	});
	
});


