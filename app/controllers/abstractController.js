metadataTool.controller('AbstractController', function ($scope, StorageService) {

	$scope.storage = StorageService;

	$scope.isUser = function() {
		return (sessionStorage.role == "ROLE_USER");
	};

	$scope.isAdmin = function() {
		return (sessionStorage.role == "ROLE_ADMIN");
	};
	
	$scope.isManager = function() {
		return (sessionStorage.role == "ROLE_MANAGER");
	};
	
	$scope.isAnnotator = function() {
		return (sessionStorage.role == "ROLE_ANNOTATOR");
	};
		
});
