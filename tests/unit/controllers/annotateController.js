describe('controller: AnnotateController', function () {

    var controller, scope, q, qInit, Document, Resource;

    beforeEach(function() {
        module('core');
        module('metadataTool');
        module('mock.alertService');
        module('mock.controlledVocabularyRepo');
        module('mock.document');
        module('mock.documentRepo');
        module('mock.modalService');
        module('mock.projectRepositoryRepo');
        module('mock.restApi');
        module('mock.resource');
        module('mock.resourceRepo');
        module('mock.storageService');
        module('mock.userService');
        module('mock.wsApi');

        inject(function ($controller, $http, $location, $q, $rootScope, $routeParams, $timeout, $window, _AlertService_, _ControlledVocabularyRepo_, _Document_, _DocumentRepo_, _ModalService_, _ProjectRepositoryRepo_, _RestApi_, _Resource_, _ResourceRepo_, _StorageService_, _UserService_, _WsApi_) {
            installPromiseMatchers();
            q = $q;
            scope = $rootScope.$new();

            Document = _Document_;
            Resource = _Resource_;

            // TODO: find a better way to do this.
            // simulate arguments being passed to ensure that the required arg[0] is a mocked document and arg[1] is a mocked resource.
            // this is required for the scope to be properly populated after $digest.
            qInit = angular.extend({}, $q);
            qInit.all = function(arguments) {
                var defer = $q.defer();
                var doc = _Document_;
                var res = _Resource_;

                doc.mock(mockDocument1);
                res.mock(mockResource1);

                defer.resolve([doc, res]);

                return defer.promise;
            };

            controller = $controller('AnnotateController', {
                $http: $http,
                $location: $location,
                $q: qInit,
                $routeParams: $routeParams,
                $scope: scope,
                $timeout: $timeout,
                $window: $window,
                AlertService: _AlertService_,
                ControlledVocabularyRepo: _ControlledVocabularyRepo_,
                DocumentRepo: _DocumentRepo_,
                ModalService: _ModalService_,
                ProjectRepositoryRepo: _ProjectRepositoryRepo_,
                RestApi: _RestApi_,
                ResourceRepo: _ResourceRepo_,
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

    describe('Are the scope methods defined', function () {
        it('accept should be defined', function () {
            expect(scope.accept).toBeDefined();
            expect(typeof scope.accept).toEqual("function");
        });
        it('addMetadataField should be defined', function () {
            expect(scope.addMetadataField).toBeDefined();
            expect(typeof scope.addMetadataField).toEqual("function");
        });
        it('addSuggestion should be defined', function () {
            expect(scope.addSuggestion).toBeDefined();
            expect(typeof scope.addSuggestion).toEqual("function");
        });
        it('delete should be defined', function () {
            expect(scope.delete).toBeDefined();
            expect(typeof scope.delete).toEqual("function");
        });
        it('managerAnnotating should be defined', function () {
            expect(scope.managerAnnotating).toBeDefined();
            expect(typeof scope.managerAnnotating).toEqual("function");
        });
        it('managerReviewing should be defined', function () {
            expect(scope.managerReviewing).toBeDefined();
            expect(typeof scope.managerReviewing).toEqual("function");
        });
        it('getControlledVocabulary should be defined', function () {
            expect(scope.getControlledVocabulary).toBeDefined();
            expect(typeof scope.getControlledVocabulary).toEqual("function");
        });
        it('getFilesOfType should be defined', function () {
            expect(scope.getFilesOfType).toBeDefined();
            expect(typeof scope.getFilesOfType).toEqual("function");
        });
        it('getIIIFUrls should be defined', function () {
            expect(scope.getIIIFUrls).toBeDefined();
            expect(typeof scope.getIIIFUrls).toEqual("function");
        });
        it('getRepositoryById should be defined', function () {
            expect(scope.getRepositoryById).toBeDefined();
            expect(typeof scope.getRepositoryById).toEqual("function");
        });
        it('push should be defined', function () {
            expect(scope.push).toBeDefined();
            expect(typeof scope.push).toEqual("function");
        });
        it('removeMetadataField should be defined', function () {
            expect(scope.removeMetadataField).toBeDefined();
            expect(typeof scope.removeMetadataField).toEqual("function");
        });
        it('requiredFieldsPresent should be defined', function () {
            expect(scope.requiredFieldsPresent).toBeDefined();
            expect(typeof scope.requiredFieldsPresent).toEqual("function");
        });
        it('requiresCuration should be defined', function () {
            expect(scope.requiresCuration).toBeDefined();
            expect(typeof scope.requiresCuration).toEqual("function");
        });
        it('save should be defined', function () {
            expect(scope.save).toBeDefined();
            expect(typeof scope.save).toEqual("function");
        });
        it('submit should be defined', function () {
            expect(scope.submit).toBeDefined();
            expect(typeof scope.submit).toEqual("function");
        });
        it('submitRejection should be defined', function () {
            expect(scope.submitRejection).toBeDefined();
            expect(typeof scope.submitRejection).toEqual("function");
        });
    });

});
