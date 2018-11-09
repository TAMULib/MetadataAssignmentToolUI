describe('controller: ProjectSuggestorController', function () {

    var controller, scope;

    beforeEach(function() {
        module('core');
        module('metadataTool');
        module('mock.modalService');
        module('mock.restApi');
        module('mock.storageService');
        module('mock.suggestorRepo');
        module('mock.userService');
        module('mock.wsApi');

        inject(function ($controller, $rootScope, $window, _ModalService_, _RestApi_, _StorageService_, _SuggestorRepo_, _UserService_, _WsApi_) {
            installPromiseMatchers();
            scope = $rootScope.$new();

            controller = $controller('ProjectSuggestorController', {
                $scope: scope,
                $window: $window,
                ModalService: _ModalService_,
                RestApi: _RestApi_,
                StorageService: _StorageService_,
                SuggestorRepo: _SuggestorRepo_,
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
