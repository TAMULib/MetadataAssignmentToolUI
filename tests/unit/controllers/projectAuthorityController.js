describe('controller: ProjectAuthorityController', function () {

    var controller, controllerAsManager, q, scope, ProjectAuthorityRepo;

    var initializeController = function(settings) {
        inject(function ($controller, $q, $rootScope, $window, _ModalService_, _ProjectRepo_, _ProjectAuthorityRepo_, _RestApi_, _StorageService_, _UserService_, _WsApi_) {
            q = $q;
            scope = $rootScope.$new();

            sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";

            ProjectAuthorityRepo = _ProjectAuthorityRepo_;

            controller = $controller('ProjectAuthorityController', {
                $scope: scope,
                $window: $window,
                ModalService: _ModalService_,
                ProjectRepo: _ProjectRepo_,
                ProjectAuthorityRepo: _ProjectAuthorityRepo_,
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
    };

    beforeEach(function() {
        module('core');
        module('metadataTool');
        module('mock.modalService');
        module('mock.projectRepo');
        module('mock.projectAuthority');
        module('mock.projectAuthorityRepo');
        module('mock.restApi');
        module('mock.storageService');
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
        it('create should be defined', function () {
            expect(scope.create).toBeDefined();
            expect(typeof scope.create).toEqual("function");
        });
        it('delete should be defined', function () {
            expect(scope.delete).toBeDefined();
            expect(typeof scope.delete).toEqual("function");
        });
        it('getProjectById should be defined', function () {
            expect(scope.getProjectById).toBeDefined();
            expect(typeof scope.getProjectById).toEqual("function");
        });
        it('update should be defined', function () {
            expect(scope.update).toBeDefined();
            expect(typeof scope.update).toEqual("function");
        });
    });

    describe('Do the scope methods work as expected', function () {
        it('create should create a new authority', function () {
            var authoritySettings = {a: "A"};
            var file;

            scope.create(dataProjectAuthority1, authoritySettings, file);
            scope.$digest();

            expect(authoritySettings.paths).not.toBeDefined();

            authoritySettings = {};
            file = {};

            spyOn(scope, 'closeModal');

            scope.create(dataProjectAuthority1, authoritySettings, file);
            scope.$digest();

            expect(authoritySettings.paths).toBeDefined();
            expect(scope.closeModal).toHaveBeenCalled();
        });
        it('delete should delete an existing authority', function () {
            spyOn(scope, 'closeModal');

            scope.delete(scope.projectAuthorities[0]);
            scope.$digest();

            expect(scope.closeModal).toHaveBeenCalled();
        });
        it('getProjectById should return a project', function () {
            var project;

            project = scope.getProjectById(scope.projects[0].id);

            expect(project).toBeDefined();

            project = scope.getProjectById(-1);

            expect(project).toBe(null);
        });
        it('update should change an authority', function () {
            var authority;

            authority = angular.copy(scope.projectAuthorities[0]);
            authority.something = "new";
            authority.dirty = function() {};

            spyOn(authority, 'dirty');

            scope.update(authority);

            expect(authority.dirty).toHaveBeenCalled();
        });
    });
});
