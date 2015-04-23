metadataTool.controller('UserController', function ($controller, $scope, User) {

	console.log('UserController started');

	angular.extend(this, $controller('AbstractController', {$scope: $scope}));

	$scope.user = User.get();
		
});

