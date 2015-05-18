metadataTool.controller('AbstractController', function ($scope, StorageService) {

	$scope.storage = StorageService;

	$scope.isUser = function() {
		return (StorageService.get('role') == "ROLE_USER");
	};

	$scope.isAdmin = function() {
		return (StorageService.get('role') == "ROLE_ADMIN");
	};
	
	$scope.isManager = function() {
		return (StorageService.get('role') == "ROLE_MANAGER");
	};
	
	$scope.isAnnotator = function() {
		return (StorageService.get('role') == "ROLE_ANNOTATOR");
	};
		
});
