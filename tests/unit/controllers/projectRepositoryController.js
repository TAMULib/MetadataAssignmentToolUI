describe('controller: ProjectRepositoryController', function () {

    var controller, scope;

    // Alternative to beforeEach() to allow for changing controller initialization specific states.
    var initializer = function(settings) {
        module('core');
        module('metadataTool');
        module('mock.modalService');
        module('mock.restApi');
        module('mock.projectRepo');
        module('mock.projectRepositoryRepo');
        module('mock.storageService');
        module('mock.userService');
        module('mock.wsApi');

        inject(function ($controller, $rootScope, $window, _ModalService_, _ProjectRepo_, _ProjectRepositoryRepo_, _RestApi_, _StorageService_, _UserService_, _WsApi_) {
            installPromiseMatchers();
            scope = $rootScope.$new();

            sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";

            controller = $controller('ProjectRepositoryController', {
                $scope: scope,
                $window: $window,
                ModalService: _ModalService_,
                ProjectRepo: _ProjectRepo_,
                ProjectRepositoryRepo: _ProjectRepositoryRepo_,
                RestApi: _RestApi_,
                StorageService: _StorageService_,
                UserService: _UserService_,
                WsApi: _WsApi_
            });

            // ensure that the isReady() is called.
            scope.$digest();
        });
    };

    describe('Is the controller defined', function () {
        it('should be defined for admin', function () {
            initializer({role: "ROLE_ADMIN"});
            expect(controller).toBeDefined();
        });
        it('should be defined for manager', function () {
            initializer({role: "ROLE_MANAGER"});
            expect(controller).toBeDefined();
        });
    });

    describe('Are the scope methods defined', function () {
        it('create should be defined', function () {
            initializer();
            expect(scope.create).toBeDefined();
            expect(typeof scope.create).toEqual("function");
        });
        it('delete should be defined', function () {
            initializer();
            expect(scope.delete).toBeDefined();
            expect(typeof scope.delete).toEqual("function");
        });
        it('getProjectById should be defined', function () {
            initializer();
            expect(scope.getProjectById).toBeDefined();
            expect(typeof scope.getProjectById).toEqual("function");
        });
        it('update should be defined', function () {
            initializer();
            expect(scope.update).toBeDefined();
            expect(typeof scope.update).toEqual("function");
        });
    });

});
