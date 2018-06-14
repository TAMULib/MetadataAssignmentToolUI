metadataTool.controller('ProjectSuggestorController', function ($controller, $scope, UserService, ProjectSuggestorRepo) {

    angular.extend(this, $controller('AbstractController', {$scope: $scope}));

    $scope.user = UserService.getCurrentUser();

    $scope.projectSuggestors = [];

    $scope.types = [];

    $scope.newSuggestor = {};
    $scope.newSuggestorSettings = {};

    UserService.userReady().then(function() {

    if($scope.isAdmin() || $scope.isManager()) {
        $scope.projectSuggestors = ProjectSuggestorRepo.getAll();
        ProjectSuggestorRepo.getTypes().then(function(data) {
            var serviceTypes = angular.fromJson(data.body).payload.HashMap;
            $scope.types = serviceTypes;
        });

        $scope.update = function(suggestor) {
            suggestor.dirty(true);
            manageSuggestor('save',suggestor);
        };

        $scope.create = function(newSuggestor,newSuggestorSettings) {
            var settings = [];
            angular.forEach(newSuggestorSettings, function(valueObj,key) {
                this.push({"key":key,"values": [valueObj.value]});
            },settings);
            newSuggestor.settings = settings;
            manageSuggestor('create',newSuggestor).then(function() {
                $scope.newSuggestor = {};
                $scope.newSuggestorSettings = {};
            });

        };

        var manageSuggestor = function(method,suggestor) {
            return ProjectSuggestorRepo[method](suggestor).then(function() {
                $scope.closeModal();
            });
        };
    }
  });

});
