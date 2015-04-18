metadataTool.controller('AbstractController', function ($scope) {

	$scope.isAdmin = function() {
		return (sessionStorage.role == "ROLE_ADMIN");
	};
	
	$scope.isManager = function() {
		console.log(sessionStorage.role);
		return (sessionStorage.role == "ROLE_MANAGER");
	};
	
	$scope.isAnnotator = function() {
		return (sessionStorage.role == "ROLE_ANNOTATOR");
	};
		
});
