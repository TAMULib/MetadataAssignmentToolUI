metadataTool.controller('AdminController', function ($scope, $http, User, UserRepo, AuthServiceApi) {

	$scope.user = User.get();
	
	$scope.users = UserRepo.get();
	
	$scope.showModal = false;

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
		} else {
			$scope.admin = false;
		}
	});
	
	$scope.isAdmin = function() {
		if(sessionStorage.role == "ROLE_ADMIN") {
			return true;
		}
		return false;
	}
	
	$scope.isManager = function() {
		if(sessionStorage.role == "ROLE_MANAGER") {
			return true;
		}
		return false;
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
		}		
		
	};

	$scope.toggleModal = function(){
		$scope.showModal = !$scope.showModal;
	};
	
});
