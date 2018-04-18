metadataTool.controller('ProjectController', function ($controller, $scope, UserService, ProjectRepo, ProjectRepositoryRepo, ProjectAuthorityRepo, ProjectSuggestorRepo) {

    angular.extend(this, $controller('AbstractController', {$scope: $scope}));

    $scope.user = UserService.getCurrentUser();

    $scope.projects = [];

    $scope.projectServices = {};

    $scope.updateableProjectServices = {};

    $scope.newProject = {};
    $scope.newProjectServices = {};

    $scope.ingestTypes = [];

    UserService.userReady().then(function() {

    if($scope.isAdmin() || $scope.isManager()) {
        $scope.projectServices.repositories = ProjectRepositoryRepo.getAll();
        $scope.projectServices.authorities = ProjectAuthorityRepo.getAll();
        $scope.projectServices.suggestors = ProjectSuggestorRepo.getAll();

        $scope.ingestTypes = ProjectRepo.getIngestTypes().then(function(data) {
            $scope.ingestTypes = angular.fromJson(data.body).payload["ArrayList<IngestType>"];
        });

        $scope.projects = ProjectRepo.getAll();

        $scope.update = function(project) {
            angular.forEach($scope.updateableProjectServices, function(serviceIndexes, serviceType) {
                project[serviceType] = [];
                angular.forEach(serviceIndexes, function(isPresent, index) {
                    if (isPresent) {
                        project[serviceType].push($scope.projectServices[serviceType][index]);
                    }

                });
            });
            project.dirty(true);
            manageProject('save', project);
        };

        $scope.create = function(newProject,newProjectServices) {
            angular.forEach(newProjectServices, function(serviceIndexes, serviceType) {
                newProject[serviceType] = [];
                angular.forEach(serviceIndexes, function(isPresent, index) {
                    if (isPresent) {
                        newProject[serviceType].push($scope.projectServices[serviceType][index]);
                    }

                });
            });

            manageProject('create',newProject).then(function() {
                $scope.newProject = {};
                $scope.newProjectServices = {};
            });

        };

        $scope.projectHasService = function(project, serviceType, index) {
            var hasService = false;

            angular.forEach(project[serviceType], function (projectService) {
                if (projectService.id == $scope.projectServices[serviceType][index].id) {
                    hasService = true;
                    return true;
                }
            });
            return hasService;
        };

        var manageProject = function(method,project) {
            return ProjectRepo[method](project).then(function() {
                $scope.closeModal();
            });
        };
    }
  });

});
