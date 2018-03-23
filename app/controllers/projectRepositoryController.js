metadataTool.controller('ProjectRepositoryController', function ($controller, $scope, UserService, ProjectRepositoryRepo) {

    angular.extend(this, $controller('AbstractController', {$scope: $scope}));

    $scope.user = UserService.getCurrentUser();

    $scope.projectRepositories = [];

    UserService.userReady().then(function() {

    if($scope.isAdmin() || $scope.isManager()) {
        $scope.projectRepositories = ProjectRepositoryRepo.getAll();

        $scope.update = function(repository) {
            ProjectRepositoryRepo.save(repository).then(function() {
                $scope.closeModal();
            });
        };
    }
  });

});
