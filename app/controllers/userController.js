metadataTool.controller('UserController', function ($scope, User) {

	$scope.user = User.get();
	
});

