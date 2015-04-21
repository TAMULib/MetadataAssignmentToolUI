metadataTool.controller('AdminController', function ($controller, $scope, $routeParams, $location, $route, $window, $http, User, UserRepo, AssumedUser, Metadata, AuthServiceApi, WsApi) {
	
    angular.extend(this, $controller('AbstractController', {$scope: $scope}));
    
    $scope.user = User.get();
	
	$scope.userRepo = UserRepo.get();

	$scope.assumedUser = AssumedUser.get();

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
	};
	
	$scope.showAssignmentsModal = function(user) {
		$scope.selectedUser = user;
		$scope.showModal = !$scope.showModal;
	};
	
	$scope.isMocking = function() {
		if(globalConfig.mockRole) {
			return true;
		}
		else {
			return false;
		}
	};

	$scope.isAssuming = function() {
		if(sessionStorage.assuming) {
			return sessionStorage.assuming;
		}
		else {
			return 'false';
		}
	};

	if($scope.isAssuming() == 'true') {
		AssumedUser.set({
			'netid': '',
			'button': 'Unassume',
			'status': ''
		});
	}
	else {
		AssumedUser.set({
			'netid': '',
			'button': 'Assume',
			'status': ''
		});
	}


	$scope.assumeUser = function(assume) {
		
		if($scope.isAssuming() == 'false') {

			if ((typeof assume !== 'undefined') && assume.netid) {	

				console.log("Assuming user");

				sessionStorage.assuming = 'true';

				sessionStorage.adminToken = sessionStorage.token;

				AuthServiceApi.getAssumedUser(assume).then(function(data) {
					
					if(data) {
						User.get("assume");

						AssumedUser.set({
							'netid': $scope.user.netid,
							'button': 'Unassume',
							'status': ''
						});
						
						$window.location.reload();
						$location.path('/assignments');

					}
					else {
						delete sessionStorage.assumedUser;

						assume = {
							'netid': assume.netid,
							'button': 'Assume',
							'status': 'invalid netid'
						};
					}
				});
			}
		} else {
			console.log("Unassuming user");

			sessionStorage.assuming = 'false';

			sessionStorage.token = sessionStorage.adminToken;
			
			AssumedUser.set({
				'netid': '',
				'button': 'Assume',
				'status': ''
			});

			User.get("unassume");

			$window.location.reload();

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
		if(JSON.parse(data.body).content.HashMap.changedUserUin == $scope.user.uin) {
			User.get(true);
			$route.reload();
		}			
	});
	
});


