describe('controller: DocumentController', function () {

    var controller, scope;

    var initializeController = function(settings) {
        inject(function ($controller, $location, $rootScope, $route, $routeParams, $window, _AlertService_, _ApiResponseActions_, _Document_, _DocumentRepo_, _ModalService_, _NgTableParams_, _ProjectRepo_, _RestApi_, _StorageService_, _UserRepo_, _UserService_, _WsApi_) {
            scope = $rootScope.$new();

            sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";

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
    };

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
        it('availableAnnotators should be defined', function () {
            expect(scope.availableAnnotators).toBeDefined();
            expect(typeof scope.availableAnnotators).toEqual("function");
        });
        it('setSelectedUser should be defined', function () {
            expect(scope.setSelectedUser).toBeDefined();
            expect(typeof scope.setSelectedUser).toEqual("function");
        });
        it('setTable should be defined', function () {
            expect(scope.setTable).toBeDefined();
            expect(typeof scope.setTable).toEqual("function");
        });
        it('togglePublished should be defined', function () {
            expect(scope.togglePublished).toBeDefined();
            expect(typeof scope.togglePublished).toEqual("function");
        });
        it('toggleProjectsFilter should be defined', function () {
            expect(scope.toggleProjectsFilter).toBeDefined();
            expect(typeof scope.toggleProjectsFilter).toEqual("function");
        });
        it('update should be defined', function () {
            expect(scope.update).toBeDefined();
            expect(typeof scope.update).toEqual("function");
        });
        it('updateTable should be defined', function () {
            expect(scope.updateTable).toBeDefined();
            expect(typeof scope.updateTable).toEqual("function");
        });
    });

    describe('Do the scope methods work as expected', function () {
        it('availableAnnotators should return an array list', function () {
            var response = scope.availableAnnotators();

            expect(typeof response).toEqual("object");
        });
        it('setSelectedUser should assign the selected user', function () {
            scope.selectedUser = null;
            scope.setSelectedUser(mockUser1);

            expect(scope.selectedUser).toBe(mockUser1);
        });
        it('setTable should setup the table', function () {
            scope.tableParams = null;
            scope.setTable();

            expect(scope.tableParams).toBeDefined();
        });
        it('togglePublished should toggle the showPublished boolean', function () {
            scope.showPublished = false;
            scope.setTable();

            spyOn(scope.tableParams, 'reload');

            scope.togglePublished();

            expect(scope.showPublished).toBe(true);
            expect(scope.tableParams.reload).toHaveBeenCalled()

            scope.togglePublished();
            expect(scope.showPublished).toBe(false);
        });
        it('toggleProjectsFilter should toggle the showProjectsFilter boolean', function () {
            scope.showProjectsFilter = false;

            scope.toggleProjectsFilter();
            expect(scope.showProjectsFilter).toBe(true);

            scope.toggleProjectsFilter();
            expect(scope.showProjectsFilter).toBe(false);
        });
        it('update should update the document status', function () {
            mockDocument1.status = '';
            mockDocument1.save = function() {};

            spyOn(mockDocument1, 'save');

            scope.update(mockDocument1, 'Open');

            expect(mockDocument1.status).toEqual('Open');
            expect(mockDocument1.annotator).not.toBeDefined();
            expect(mockDocument1.save).toHaveBeenCalled();

            scope.update(mockDocument1, 'Closed');
            expect(mockDocument1.status).toEqual('Closed');
            expect(mockDocument1.annotator).toEqual(scope.user.firstName + ' ' + scope.user.lastName);

            scope.update(mockDocument1, 'Other');
            expect(mockDocument1.status).toEqual('Other');
        });
        it('updateTable should reload the table', function () {
            scope.setTable();
            scope.tableNeedsUpdating = true;

            spyOn(scope.tableParams, 'reload');

            scope.updateTable();

            expect(scope.tableNeedsUpdating).toBe(false);
            expect(scope.tableParams.reload).toHaveBeenCalled();
        });
    });

});
