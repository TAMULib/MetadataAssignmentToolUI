describe('controller: UserRepoController', function () {

    var controller, scope;

    var initializeController = function(settings) {
        inject(function ($controller, $injector, $location, $rootScope, $route, $window, _ModalService_, _RestApi_, _StorageService_, _UserRepo_, _UserService_, _WsApi_) {
            scope = $rootScope.$new();

            UserService = _UserService_;

            sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";

            controller = $controller('UserRepoController', {
                $route: $route,
                $scope: scope,
                $injector: $injector,
                $location: $location,
                $window: $window,
                ModalService: _ModalService_,
                RestApi: _RestApi_,
                StorageService: _StorageService_,
                UserRepo: _UserRepo_,
                UserService: _UserService_,
                WsApi: _WsApi_
            });

            // ensure that the isReady() is called.
            scope.$digest();
        });
    };

    beforeEach(function() {
        module('core');
        module('metadataTool');
        module('mock.modalService');
        module('mock.restApi');
        module('mock.storageService');
        module('mock.userRepo');
        module('mock.userService');
        module('mock.wsApi');

        installPromiseMatchers();
        initializeController();
    });

    describe('Is the controller defined', function () {
        it('should be defined for admin', function () {
            initializeController({role: "ROLE_ADMIN"});
            expect(controller).toBeDefined();
        });
        it('should be defined for manager', function () {
            initializeController({role: "ROLE_MANAGER"});
            expect(controller).toBeDefined();
        });
        it('should be defined for anonymous', function () {
            initializeController({role: "ROLE_ANONYMOUS"});
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
        it('canDelete should be defined', function () {
            expect(scope.canDelete).toBeDefined();
            expect(typeof scope.canDelete).toEqual("function");
        });
        it('delete should be defined', function () {
            expect(scope.delete).toBeDefined();
            expect(typeof scope.delete).toEqual("function");
        });
    });

    describe('Do the scope methods work as expected', function () {
        it('updateRole should update a users role', function () {
            var originalUser2 = angular.copy(mockUser2);
            mockUser2.role = "ROLE_NEW";
            mockUser2.save = function() {};

            spyOn(mockUser2, 'save');

            scope.updateRole(mockUser2);
            scope.$digest();

            expect(mockUser2.role).not.toEqual(originalUser2.role);
            expect(mockUser2.save).toHaveBeenCalled();

            mockUser2.role = "ROLE_ANNOTATOR";
            mockUser2.save = function() {};

            spyOn(mockUser2, 'save');

            scope.updateRole(mockUser2);
            scope.$digest();

            expect(mockUser2.save).toHaveBeenCalled();

            mockUser2.role = "ROLE_USER";
            mockUser2.save = function() {};

            spyOn(mockUser2, 'save');

            scope.updateRole(mockUser2);
            scope.$digest();

            expect(mockUser2.save).toHaveBeenCalled();
        });
        it('allowableRoles should return a list of allowed roles', function () {
            var roles;

            roles = scope.allowableRoles();

            expect(roles).toBeDefined();

            initializeController({role: "ROLE_MANAGER"});
            roles = null;

            roles = scope.allowableRoles("ROLE_ADMIN");

            expect(roles).toBeDefined();

            roles = null;

            roles = scope.allowableRoles();

            expect(roles).toBeDefined();

            roles = null;

            roles = scope.allowableRoles("ROLE_USER");

            expect(roles).toBeDefined();
        });
        it('canDelete should return boolean if a user can be deleted', function () {
            var canDelete;

            mockUser1.role = "ROLE_ADMIN";

            canDelete = scope.canDelete(mockUser1);

            expect(canDelete).toBe(false);

            mockUser2.role = "ROLE_ADMIN";

            canDelete = scope.canDelete(mockUser2);

            expect(canDelete).toBe(true);

            initializeController({role: "ROLE_MANAGER"});
            mockUser2.role = "ROLE_MANAGER";

            canDelete = scope.canDelete(mockUser2);

            expect(canDelete).toBe(true);

            mockUser2.role = "ROLE_ADMIN";

            canDelete = scope.canDelete(mockUser2);

            expect(canDelete).toBe(false);
        });
        it('delete should delete a user', function () {
            mockUser1.delete = function() {};
            spyOn(mockUser1, 'delete');

            scope.delete(mockUser1);
            scope.$digest();

            expect(mockUser1.delete).toHaveBeenCalled();
        });
    });

});
