metadataTool.controller('BatchPublishController', function ($controller, $scope, ProjectRepo, AlertService) {
    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    $scope.projects = ProjectRepo.getAll();

    $scope.isPublishing = false;

    ProjectRepo.ready().then(function () {
        if ($scope.projects.length > 0) {
            $scope.batchProject = $scope.projects[0];

            if ($scope.batchProject.repositories[0]) {
                $scope.batchRepository = $scope.batchProject.repositories[0];
            } else {
                $scope.batchRepository = {};
            }

            $scope.publishDocuments = function (project, repository) {
                $scope.isPublishing = true;
                ProjectRepo.batchPublishDocuments(project.id, repository.id).then(function (rawResponse) {
                    var response = angular.fromJson(rawResponse.body);
                    AlertService.add(response.meta, "app/projects");
                    $scope.isPublishing = false;
                    $scope.closeModal();
                });
            };
        }
    });

});
