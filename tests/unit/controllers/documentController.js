describe('controller: DocumentController', function () {

    var controller, scope;

    beforeEach(function() {
        module('core');
        module('metadataTool');
        module('mock.alertService');
        module('mock.apiResponseActions');
        module('mock.document');
        module('mock.documentRepo');
        module('mock.modalService');
        module('mock.ngTableParams');
        module('mock.projectRepo');
        module('mock.restApi');
        module('mock.storageService');
        module('mock.userRepo');
        module('mock.userService');
        module('mock.wsApi');

        inject(function ($controller, $location, $rootScope, $route, $routeParams, $window, _AlertService_, _ApiResponseActions_, _Document_, _DocumentRepo_, _ModalService_, _NgTableParams_, _ProjectRepo_, _RestApi_, _StorageService_, _UserRepo_, _UserService_, _WsApi_) {
            installPromiseMatchers();
            scope = $rootScope.$new();

            controller = $controller('DocumentController', {
                $route: $route,
                $routeParams: $routeParams,
                $scope: scope,
                $location: $location,
                $window: $window,
                AlertService: _AlertService_,
                ApiResponseActions: _ApiResponseActions_,
                Document: _Document_,
                DocumentRepo: _DocumentRepo_,
                ModalService: _ModalService_,
                NgTableParams: _NgTableParams_,
                ProjectRepo: _ProjectRepo_,
                RestApi: _RestApi_,
                StorageService: _StorageService_,
                UserRepo: _UserRepo_,
                UserService: _UserService_,
                WsApi: _WsApi_
            });

            // ensure that the isReady() is called.
            scope.$digest();
        });
    });

    describe('Is the controller defined', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });
    });

});