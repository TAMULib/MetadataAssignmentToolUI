metadataTool.controller('ProjectController', function ($controller, $scope, UserService, ProjectRepo, ProjectRepositoryRepo, ProjectAuthorityRepo, ProjectSuggestorRepo) {

    angular.extend(this, $controller('AbstractController', {$scope: $scope}));

    $scope.user = UserService.getCurrentUser();

    $scope.projects = [];

    $scope.projectServices = {};

    $scope.updateableProjectServices = {};

    $scope.newProject = {};

    UserService.userReady().then(function() {

    if($scope.isAdmin() || $scope.isManager()) {
        $scope.projectServices['repositories'] = ProjectRepositoryRepo.getAll();
        $scope.projectServices['authorities'] = ProjectAuthorityRepo.getAll();
        $scope.projectServices['suggestors'] = ProjectSuggestorRepo.getAll();

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

        $scope.create = function(newProject,newProjectSettings) {
            var settings = [];
            angular.forEach(newProjectSettings, function(valueObj,key) {
                this.push({"key":key,"values": [valueObj.value]});
            },settings);
            newProject.settings = settings;
            manageProject('create',newProject).then(function() {
                $scope.newProject = {};
                $scope.newProjectSettings = {};
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
