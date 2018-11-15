describe('controller: AbstractController', function () {

    var controller, scope;

    beforeEach(function() {
        module('core');
        module('metadataTool');
        module('mock.modalService');
        module('mock.restApi');
        module('mock.storageService');
        module('mock.wsApi');

        inject(function ($controller, $rootScope, $window, _ModalService_, _RestApi_, _StorageService_, _WsApi_) {
            installPromiseMatchers();
            scope = $rootScope.$new();

            controller = $controller('AbstractController', {
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
        it('isAdmin should be defined', function () {
            expect(scope.isAdmin).toBeDefined();
            expect(typeof scope.isAdmin).toEqual("function");
        });
        it('isAnnotator should be defined', function () {
            expect(scope.isAnnotator).toBeDefined();
            expect(typeof scope.isAnnotator).toEqual("function");
        });
        it('isAnonymous should be defined', function () {
            expect(scope.isAnonymous).toBeDefined();
            expect(typeof scope.isAnonymous).toEqual("function");
        });
        it('isAssumed should be defined', function () {
            expect(scope.isAssumed).toBeDefined();
            expect(typeof scope.isAssumed).toEqual("function");
        });
        it('isAssuming should be defined', function () {
            expect(scope.isAssuming).toBeDefined();
            expect(typeof scope.isAssuming).toEqual("function");
        });
        it('isManager should be defined', function () {
            expect(scope.isManager).toBeDefined();
            expect(typeof scope.isManager).toEqual("function");
        });
        it('isUser should be defined', function () {
            expect(scope.isUser).toBeDefined();
            expect(typeof scope.isUser).toEqual("function");
        });
        it('reportError should be defined', function () {
            expect(scope.reportError).toBeDefined();
            expect(typeof scope.reportError).toEqual("function");
        });
    });

});
