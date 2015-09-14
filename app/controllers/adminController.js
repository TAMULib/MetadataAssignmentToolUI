metadataTool.controller('AdminController', function ($controller, $route, $scope, AssumedControl, AuthServiceApi, Metadata, StorageService, User, UserRepo, WsApi) {

    angular.extend(this, $controller('AbstractController', {$scope: $scope}));

    if(typeof StorageService.get("assuming") === 'undefined') {
		StorageService.set('assuming', 'false');
	}

	$scope.user = User.get();

	$scope.exportFormat = "saf"

    $scope.assumedControl = AssumedControl.get();
    
    AssumedControl.set({
		'netid': '',
		'button': (StorageService.get("assuming") == 'true') ? 'Unassume' : 'Assume',
		'status': ''
	});
	
	$scope.$watch('user.role', function() {
		if($scope.user.role) {
			StorageService.set('role', $scope.user.role);
			if ($scope.user.role == 'ROLE_ADMIN') {
				$scope.admin = true;
			}
			else {
				$scope.admin = false;
			}
		}
	});

	$scope.isAssuming = function() {
		return StorageService.get("assuming");
	};

	$scope.isMocking = function() {
		if(globalConfig.mockRole) {
			return true;
		}
		else {
			return false;
		}
	};
	
	$scope.assumeUser = function(assume) {
	
		if($scope.isAssuming() == 'false') {

			if ((typeof assume !== 'undefined') && assume.netid) {	

				logger.log("Assuming user");

				StorageService.set('assumedUser', JSON.stringify(assume));
				StorageService.set('assuming', 'true');
				StorageService.set('adminToken', StorageService.get("token"));

				AuthServiceApi.getAssumedUser(assume).then(function(data) {
				
					User.refresh();
					UserRepo.refresh();

					AssumedControl.set({
						'netid': '',
						'button': 'Unassume',
						'status': ''
					});

					angular.element("#assumeUserModal").modal("hide");
				});
			}
		} else {
			console.log("Unassuming user");

			StorageService.delete('assumedUser');
			StorageService.set('assuming', 'false', 'session');
			StorageService.set('token', StorageService.get("adminToken"));
			
			AssumedControl.set({
				'netid': '',
				'button': 'Assume',
				'status': ''
			});

			User.refresh();
			UserRepo.refresh();

			StorageService.set("role", $scope.user.role);
		}
		
	};

	$scope.sync = function() {
		WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'admin', 
				method: 'sync'
		}).then(function(data) {
			logger.log(data);
		});
	};
	
});
