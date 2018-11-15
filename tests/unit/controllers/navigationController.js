describe('controller: NavigationController', function () {

    var controller, scope;

    beforeEach(function() {
        module('core');
        module('metadataTool');
        module('mock.modalService');
        module('mock.restApi');
        module('mock.storageService');
        module('mock.wsApi');

        inject(function ($controller, $location, $rootScope, $window, _ModalService_, _RestApi_, _StorageService_, _WsApi_) {
            installPromiseMatchers();
            scope = $rootScope.$new();

            controller = $controller('NavigationController', {
                $location: $location,
                $scope: scope,
                $window: $window,
                ModalService: _ModalService_,
                RestApi: _RestApi_,
                StorageService: _StorageService_,
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

    describe('Are the scope methods defined', function () {
        it('$on should be defined', function () {
            expect(scope.$on).toBeDefined();
            expect(typeof scope.$on).toEqual("function");
        });
        it('updateHeight should be defined', function () {
            expect(scope.updateHeight).toBeDefined();
            expect(typeof scope.updateHeight).toEqual("function");
        });
        it('updateWidth should be defined', function () {
            expect(scope.updateWidth).toBeDefined();
            expect(typeof scope.updateWidth).toEqual("function");
        });
    });

});
