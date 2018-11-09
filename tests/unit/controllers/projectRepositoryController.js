describe('controller: ProjectRepositoryController', function () {

    var controller, scope;

    beforeEach(function() {
        module('core');
        module('metadataTool');
        module('mock.modalService');
        module('mock.restApi');
        module('mock.projectRepositoryRepo');
        module('mock.storageService');
        module('mock.userService');
        module('mock.wsApi');

        inject(function ($controller, $rootScope, $window, _ModalService_, _ProjectRepositoryRepo_, _RestApi_, _StorageService_, _UserService_, _WsApi_) {
            installPromiseMatchers();
            scope = $rootScope.$new();

            controller = $controller('ProjectRepositoryController', {
                $scope: scope,
                $window: $window,
                ModalService: _ModalService_,
                ProjectRepositoryRepo: _ProjectRepositoryRepo_,
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

});
