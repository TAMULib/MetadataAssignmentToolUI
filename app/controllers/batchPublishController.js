metadataTool.controller('BatchPublishController', function ($controller, $scope, ProjectRepo) {
    angular.extend(this, $controller('AbstractController', {$scope: $scope}));

    $scope.projects = ProjectRepo.getAll();

	$scope.batchProject = {};

	$scope.batchRepository = {};

    ProjectRepo.ready().then(function() {
        $scope.batchProject = $scope.projects[0];
		$scope.batchRepository = $scope.batchProject.repositories[0];

		$scope.publishDocuments = function() {
			ProjectRepo.batchPublishDocuments($scope.batchProject.id,$scope.batchRepository.id);
		};
    });

});
