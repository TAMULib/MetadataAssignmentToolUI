metadataTool.controller('ProjectAuthorityController', function ($controller, $scope, UserService, ProjectAuthorityRepo) {

    angular.extend(this, $controller('AbstractController', {$scope: $scope}));

    $scope.user = UserService.getCurrentUser();

    $scope.projectAuthorities = [];

    $scope.types = [];

    $scope.newAuthority = {};
    $scope.newAuthoritySettings = {};

    UserService.userReady().then(function() {

    if($scope.isAdmin() || $scope.isManager()) {
        $scope.projectAuthorities = ProjectAuthorityRepo.getAll();
        ProjectAuthorityRepo.getTypes().then(function(data) {
            var serviceTypes = angular.fromJson(data.body).payload.HashMap;
            $scope.types = serviceTypes;
        });

        $scope.update = function(authority) {
            repository.dirty(true);
            manageRepository('save',authority);
        };

        $scope.create = function(newAuthority,newAuthoritySettings) {
            var settings = [];
            angular.forEach(newAuthoritySettings, function(valueObj,key) {
                this.push({"key":key,"values": [valueObj.value]});
            },settings);
            newAuthority.settings = settings;
            manageAuthority('create',newAuthority).then(function() {
                $scope.newAuthority = {};
                $scope.newAuthoritySettings = {};
            });

        };

        var manageAuthority = function(method,authority) {
            return ProjectAuthorityRepo[method](authority).then(function() {
                $scope.closeModal();
            });
        };
    }
  });

});
