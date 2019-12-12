metadataTool.controller('ProjectRepositoryController', function ($controller, $scope, UserService, ProjectRepositoryRepo, ProjectRepo) {

    angular.extend(this, $controller('AbstractController', {$scope: $scope}));

    $scope.user = UserService.getCurrentUser();

    $scope.projectRepositories = [];

    $scope.projects = [];

    $scope.types = [];

    $scope.newRepository = {};
    $scope.newRepositorySettings = {};

    UserService.userReady().then(function() {

    if($scope.isAdmin() || $scope.isManager()) {
        $scope.projectRepositories = ProjectRepositoryRepo.getAll();
        ProjectRepositoryRepo.getTypes().then(function(data) {
            var serviceTypes = angular.fromJson(data.body).payload.HashMap;
            $scope.types = serviceTypes;
        });

        $scope.projects = ProjectRepo.getAll();

        $scope.delete = function(repository) {
            manageRepository('delete',repository);
        };

        $scope.update = function(repository) {
            repository.dirty(true);
            manageRepository('save',repository);
        };

        $scope.create = function(newRepository,newRepositorySettings) {
            var settings = [];
            angular.forEach(newRepositorySettings, function(valueObj,key) {
                this.push({"key":key,"protect":valueObj.protect,"values": [valueObj.value]});
            },settings);
            newRepository.settings = settings;
            manageRepository('create',newRepository).then(function() {
                $scope.newRepository = {};
                $scope.newRepositorySettings = {};
            });

        };

        $scope.getProjectById = function(projectId) {
            var project = null;
            for (var i in $scope.projects) {
                if (projectId == $scope.projects[i].id) {
                    project = $scope.projects[i];
                    break;
                }
            }
            return project;
        };

        var manageRepository = function(method,repository) {
            return ProjectRepositoryRepo[method](repository).then(function() {
                $scope.closeModal();
            });
        };
    }
  });

});
