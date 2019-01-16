describe('controller: AdminController', function () {

    var controller, q, scope;

    beforeEach(function() {
        module('core');
        module('metadataTool');
        module('mock.assumedControl');
        module('mock.authService');
        module('mock.modalService');
        module('mock.restApi');
        module('mock.storageService');
        module('mock.userService');
        module('mock.wsApi');

        inject(function ($controller, $q, $rootScope, $route, $injector, $window, _AssumedControl_, _AuthService_, _ModalService_, _RestApi_, _StorageService_, _UserService_, _WsApi_) {
            installPromiseMatchers();
            q = $q;
            scope = $rootScope.$new();

            controller = $controller('AdminController', {
                $injector: $injector,
                $route: $route,
                $scope: scope,
                $window: $window,
                AssumedControl: _AssumedControl_,
                AuthService: _AuthService_,
                ModalService: _ModalService_,
                RestApi: _RestApi_,
                StorageService: _StorageService_,
                UserService: _UserService_,
                WsApi: _WsApi_
            });

            // ensure that the isReady() is called.
            if (!scope.$$phase) {
                scope.$digest();
            }
        });
    });

    describe('Is the controller defined', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });
    });

});
