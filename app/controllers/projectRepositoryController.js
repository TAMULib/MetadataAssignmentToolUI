metadataTool.controller('ProjectRepositoryController', function ($controller, $scope, UserService, ProjectRepositoryRepo) {

    angular.extend(this, $controller('AbstractController', {$scope: $scope}));

    $scope.user = UserService.getCurrentUser();

    $scope.projectRepositories = [];

    $scope.types = [];

    UserService.userReady().then(function() {

    if($scope.isAdmin() || $scope.isManager()) {
        $scope.projectRepositories = ProjectRepositoryRepo.getAll();
        ProjectRepositoryRepo.getTypes().then(function(data) {
            var serviceTypes = angular.fromJson(data.body).payload["ArrayList<ServiceType>"];
            $scope.types = serviceTypes;
        });

        $scope.update = function(repository) {
            repository.dirty(true);
            manageRepository('save',repository);
        };

        $scope.create = function(newRepository) {
            manageRepository('create',newRepository);
        };

        var manageRepository = function(method,repository) {
            ProjectRepositoryRepo[method](repository).then(function() {
                $scope.closeModal();
            });
        };
    }
  });

});
