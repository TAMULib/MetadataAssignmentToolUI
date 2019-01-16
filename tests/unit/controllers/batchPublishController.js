describe('controller: BatchPublishController', function () {

    var controller, q, scope;

    var initializeController = function(settings) {
        inject(function ($controller, $q, $rootScope, $window, _AlertService_, _ModalService_, _ProjectRepo_, _RestApi_, _StorageService_, _WsApi_) {
            installPromiseMatchers();

            q = $q;
            scope = $rootScope.$new();

            sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
            sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

            controller = $controller('BatchPublishController', {
                $scope: scope,
                $window: $window,
                AlertService: _AlertService_,
                ModalService: _ModalService_,
                RestApi: _RestApi_,
                ProjectRepo: _ProjectRepo_,
                StorageService: _StorageService_,
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
        module('mock.alertService');
        module('mock.document');
        module('mock.modalService');
        module('mock.project');
        module('mock.projectRepo');
        module('mock.restApi');
        module('mock.storageService');
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
        it('publishDocuments should be defined', function () {
            expect(scope.publishDocuments).toBeDefined();
            expect(typeof scope.publishDocuments).toEqual("function");
        });
    });

    describe('Do the scope methods work as expected', function () {
        it('publishDocuments should publish a document to a project', function () {
            spyOn(scope, 'closeModal');

            scope.publishDocuments(dataProject1, dataDocument1);
            scope.$digest();

            expect(scope.closeModal).toHaveBeenCalled();
        });
    });

});
