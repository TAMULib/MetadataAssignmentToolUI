metadataTool.controller('AdminController', function ($controller, $injector, $route, $scope, AssumedControl, AuthServiceApi, StorageService, UserService, WsApi) {

    angular.extend(this, $controller('CoreAdminController', {
        $scope: $scope
    }));

    $scope.sync = function () {
        WsApi.fetch({
            endpoint: '/private/queue',
            controller: 'admin',
            method: 'sync'
        }).then(function (data) {
            logger.log(data);
        });
    };

});
