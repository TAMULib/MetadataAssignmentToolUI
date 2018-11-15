describe('controller: ExportController', function () {

    var controller, scope;

    beforeEach(function() {
        module('core');
        module('metadataTool');
        module('mock.alertService');
        module('mock.metadataRepo');
        module('mock.modalService');
        module('mock.projectRepo');
        module('mock.restApi');
        module('mock.storageService');
        module('mock.wsApi');

        inject(function ($controller, $rootScope, $window, _AlertService_, _MetadataRepo_, _ModalService_, _ProjectRepo_, _RestApi_, _StorageService_, _WsApi_) {
            installPromiseMatchers();
            scope = $rootScope.$new();

            controller = $controller('ExportController', {
                $scope: scope,
                $window: $window,
                AlertService: _AlertService_,
                MetadataRepo: _MetadataRepo_,
                ModalService: _ModalService_,
                ProjectRepo: _ProjectRepo_,
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
        it('export should be defined', function () {
            expect(scope.export).toBeDefined();
            expect(typeof scope.export).toEqual("function");
        });
        it('unlock should be defined', function () {
            expect(scope.unlock).toBeDefined();
            expect(typeof scope.unlock).toEqual("function");
        });
    });

});
