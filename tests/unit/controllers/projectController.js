describe('controller: ProjectController', function () {

    var controller, scope;

    beforeEach(function() {
        module('core');
        module('metadataTool');
        module('mock.metadataRepo');
        module('mock.modalService');
        module('mock.projectAuthorityRepo');
        module('mock.projectRepo');
        module('mock.projectRepositoryRepo');
        module('mock.restApi');
        module('mock.storageService');
        module('mock.projectSuggestorRepo');
        module('mock.userService');
        module('mock.wsApi');

        inject(function ($controller, $rootScope, $window, _MetadataRepo_, _ModalService_, _RestApi_, _ProjectRepo_, _ProjectAuthorityRepo_, _ProjectRepositoryRepo_, _StorageService_, _ProjectSuggestorRepo_, _UserService_, _WsApi_) {
            installPromiseMatchers();
            scope = $rootScope.$new();

            controller = $controller('ProjectController', {
                $scope: scope,
                $window: $window,
                MetadataRepo: _MetadataRepo_,
                ModalService: _ModalService_,
                ProjectAuthorityRepo: _ProjectAuthorityRepo_,
                ProjectRepo: _ProjectRepo_,
                ProjectRepositoryRepo: _ProjectRepositoryRepo_,
                RestApi: _RestApi_,
                StorageService: _StorageService_,
                ProjectSuggestorRepo: _ProjectSuggestorRepo_,
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
