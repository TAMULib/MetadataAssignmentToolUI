describe('controller: UserRepoController', function () {

    var controller, scope;

    beforeEach(function() {
        module('core');
        module('metadataTool');
        module('mock.modalService');
        module('mock.restApi');
        module('mock.storageService');
        module('mock.userService');
        module('mock.wsApi');

        inject(function ($controller, $injector, $location, $rootScope, $route, $window, _ModalService_, _RestApi_, _StorageService_, _UserService_, _WsApi_) {
            installPromiseMatchers();
            scope = $rootScope.$new();

            controller = $controller('UserRepoController', {
                $route: $route,
                $scope: scope,
                $injector: $injector,
                $location: $location,
                $window: $window,
                ModalService: _ModalService_,
                RestApi: _RestApi_,
                StorageService: _StorageService_,
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

    describe('Are the scope methods defined', function () {
        it('updateRole should be defined', function () {
            expect(scope.updateRole).toBeDefined();
            expect(typeof scope.updateRole).toEqual("function");
        });
        it('allowableRoles should be defined', function () {
            expect(scope.allowableRoles).toBeDefined();
            expect(typeof scope.allowableRoles).toEqual("function");
        });
        it('delete should be defined', function () {
            expect(scope.delete).toBeDefined();
            expect(typeof scope.delete).toEqual("function");
        });
        it('canDelete should be defined', function () {
            expect(scope.canDelete).toBeDefined();
            expect(typeof scope.canDelete).toEqual("function");
        });
    });

});
