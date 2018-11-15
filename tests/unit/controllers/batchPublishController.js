describe('controller: BatchPublishController', function () {

    var controller, scope;

    beforeEach(function() {
        module('core');
        module('metadataTool');
        module('mock.alertService');
        module('mock.modalService');
        module('mock.projectRepo');
        module('mock.restApi');
        module('mock.storageService');
        module('mock.wsApi');

        inject(function ($controller, $rootScope, $window, _AlertService_, _ModalService_, _ProjectRepo_, _RestApi_, _StorageService_, _WsApi_) {
            installPromiseMatchers();
            scope = $rootScope.$new();

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
            scope.$digest();
        });
    });

    describe('Is the controller defined', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });
    });

    describe('Are the scope methods defined', function () {
        it('publishDocuments should be defined', function () {
            expect(scope.publishDocuments).toBeDefined();
            expect(typeof scope.publishDocuments).toEqual("function");
        });
    });

});
