describe('controller: AnnotateController', function () {

    var controller, scope, q;

    beforeEach(function() {
        module('core');
        module('metadataTool');
        module('mock.alertService');
        module('mock.controlledVocabularyRepo');
        module('mock.documentRepo');
        module('mock.modalService');
        module('mock.restApi');
        module('mock.resourceRepo');
        module('mock.storageService');
        module('mock.userService');
        module('mock.wsApi');

        inject(function ($controller, $http, $location, $q, $rootScope, $routeParams, $timeout, $window, _AlertService_, _ControlledVocabularyRepo_, _DocumentRepo_, _ModalService_, _RestApi_, _ResourceRepo_, _StorageService_, _UserService_, _WsApi_) {
            installPromiseMatchers();
            q = $q;
            scope = $rootScope.$new();

            controller = $controller('AnnotateController', {
                $http: $http,
                $location: $location,
                $q: $q,
                $routeParams: $routeParams,
                $scope: scope,
                $timeout: $timeout,
                $window: $window,
                AlertService: _AlertService_,
                ControlledVocabularyRepo: _ControlledVocabularyRepo_,
                DocumentRepo: _DocumentRepo_,
                ModalService: _ModalService_,
                RestApi: _RestApi_,
                ResourceRepo: _ResourceRepo_,
                StorageService: _StorageService_,
                UserService: _UserService_,
                WsApi: _WsApi_
            });

            // TODO
            // ensure that the isReady() is called.
            //scope.$digest();
        });
    });

    describe('Is the controller defined', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });
    });

});
