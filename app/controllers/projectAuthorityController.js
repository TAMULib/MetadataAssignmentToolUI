metadataTool.controller('ProjectAuthorityController', function ($controller, $scope, UserService, ProjectAuthorityRepo, ProjectRepo) {

    angular.extend(this, $controller('AbstractController', {$scope: $scope}));

    $scope.user = UserService.getCurrentUser();

    $scope.projectAuthorities = [];

    $scope.projects = [];

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

        $scope.projects = ProjectRepo.getAll();

        $scope.delete = function(authority) {
            manageAuthority('delete',authority);
        };

        $scope.update = function(authority) {
            repository.dirty(true);
            manageRepository('save',authority);
        };

        $scope.create = function(newAuthority,newAuthoritySettings,file) {
            if (typeof file !== 'undefined') {
                ProjectAuthorityRepo.uploadCsv(file).then(function(data) {
                    var body = angular.fromJson(data.body);
                    newAuthoritySettings.paths = {"value":body.payload.String};
                    create(newAuthority,newAuthoritySettings);
                });
            } else {
                create(newAuthority,newAuthoritySettings);
            }
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

        var create = function(newAuthority,newAuthoritySettings) {
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
