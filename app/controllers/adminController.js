metadataTool.controller('AdminController', function ($controller, $location, $scope, $window, User, AssumedControl, Metadata, AuthServiceApi, WsApi) {

    angular.extend(this, $controller('AbstractController', {$scope: $scope}));

    if(typeof sessionStorage.assuming === 'undefined') {
		sessionStorage.assuming = 'false';
	}

    $scope.assumedUser = AssumedControl.get();
    
    AssumedControl.set({
		'user': $scope.user,
		'netid': '',
		'button': (sessionStorage.assuming == 'true') ? 'Unassume' : 'Assume',
		'status': ''
	});
	
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
	    
	User.ready().then(function() {
		
		$scope.assumeUser = function(assume) {
		
			if($scope.isAssuming() == 'false') {

				if ((typeof assume !== 'undefined') && assume.netid) {	

					console.log("Assuming user");

					sessionStorage.assumedUser = JSON.stringify(assume);

					sessionStorage.assuming = 'true';

					sessionStorage.adminToken = sessionStorage.token;

					AuthServiceApi.getAssumedUser(assume).then(function(data) {
						
						if(data) {
						
							$scope.getNewUser();

							AssumedControl.set({
								'user': $scope.user,
								'netid': '',
								'button': 'Unassume',
								'status': ''
							});
							
							$location.path('/assignments');
							$window.location.reload();

						}
						else {

							sessionStorage.assuming = 'false';

							AssumedControl.set({
								'user': $scope.user,
								'netid': assume.netid,
								'button': 'Assume',
								'status': 'invalid netid'
							});
						}
					});
				}
			} else {
				console.log("Unassuming user");

				delete sessionStorage.assumedUser;

				sessionStorage.assuming = 'false';

				sessionStorage.token = sessionStorage.adminToken;
				
				AssumedControl.set({
					'user': $scope.user,
					'netid': '',
					'button': 'Assume',
					'status': ''
				});

				$scope.getNewUser();

				$location.path('/documents');
				$window.location.reload();
				
			}
			
		};

	});
	
	$scope.exportMetadata = function() {
		console.log("Exporting metadata");
		return Metadata.getAllPublished().then(function(metadata) {
			return  JSON.parse(metadata.body).content["ArrayList<ArrayList>"];
		});
	};

	$scope.sync = function() {
		var syncPromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'document', 
				method: 'sync'
		});
		syncPromise.then(function(data) {
			console.log(data);
		});
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
		return sessionStorage.assuming;
	};
	
});
