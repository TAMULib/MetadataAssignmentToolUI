describe('controller: AnnotateController', function () {

    var controller, routeParams, scope, q, qInit, Document, Resource;

    var createMockMethods = function() {
        scope.document.push = function() {
            var defer = q.defer();
            defer.resolve();
            return defer.promise;
        };

        scope.document.save = function() {
            var defer = q.defer();
            defer.resolve();
            return defer.promise;
        };
    }

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

            angular.extend($routeParams, {
                projectKey: 'Project 001',
                documentKey: 'Document 001'
            });

            routeParams = $routeParams;
            scope = $rootScope.$new();

            Document = _Document_;
            Resource = _Resource_;

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
        it('hasFileType should be defined', function () {
            expect(scope.hasFileType).toBeDefined();
            expect(typeof scope.hasFileType).toEqual("function");
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

    describe('Do the scope methods work as expected', function () {
        it('accept should submit a document as accepted', function () {
            delete scope.document.status;

            spyOn(scope.document, 'save').and.callThrough();

            scope.accept();

            expect(scope.document.status).toEqual("Accepted");
            expect(scope.document.save).toHaveBeenCalled();
        });
        it('addMetadataField should add a new field value', function () {
            var field = {
                id: 1,
                label: {
                    profile: {defaultValue: ''},
                    value: "Mock Field"
                },
                values: [{
                    field: 1,
                    value: "first"
                }]
            };

            scope.addMetadataField(field);

            expect(field.values.length).toEqual(2);
        });
        it('addSuggestion should add a suggestion', function () {
            var field = {
                id: 1,
                label: {
                    profile: {defaultValue: ''},
                    value: "Mock Field"
                },
                values: [{
                    field: 1,
                    value: "first"
                }]
            };
            var suggestion = {field: 1, value: "second"};

            scope.addSuggestion(field, suggestion);

            expect(field.values.length).toEqual(2);

            field.values[0].value = "";
            suggestion.value = "third";

            scope.addSuggestion(field, suggestion);

            expect(field.values[0].value).toEqual("third");
        });
        it('delete should delete a document', function () {
            var document = Document;
            document.mock(mockDocument1);
            spyOn(document, 'delete').and.callThrough();

            scope.delete(document);
            scope.$digest();

            expect(document.delete).toHaveBeenCalled();
        });
        it('hasFileType should return a boolean', function () {
            var response;

            response = scope.hasFileType("text");

            // FIXME: needs work, is scope.resource supposed to be a resource object or an array of resource objects?
            //expect(response).toBe(true);

            //response = scope.hasFileType("image");

            //expect(response).toBe(false);
        });
        it('managerAnnotating should return a boolean', function () {
            var response;

            routeParams.action = 'annotate';
            response = scope.managerAnnotating();

            expect(response).toBe(true);

            delete routeParams.action;
            response = scope.managerAnnotating();

            expect(response).toBe(false);
        });
        it('managerReviewing should return a boolean', function () {
            var response;

            routeParams.action = 'review';
            response = scope.managerReviewing();

            expect(response).toBe(true);

            delete routeParams.action;
            response = scope.managerReviewing();

            expect(response).toBe(false);
        });
        it('getControlledVocabulary should return a controlled vocabulary', function () {
            var response;

            response = scope.getControlledVocabulary(0);

            expect(response).toBe(scope.cv[0]);

            response = scope.getControlledVocabulary(-1);

            expect(response).toEqual([]);
        });
        it('getFilesOfType should return a list of files', function () {
            var response;

            response = scope.getFilesOfType('text');

            expect(response.length).toEqual(1);
            expect(response[0].name).toEqual('Resource 001');
            expect(response[0].document).toEqual('1');
            expect(response[0].mimeType).toEqual('text/plain');


            delete scope.resources;
            response = scope.getFilesOfType('text');

            expect(response).toEqual([]);
        });
        it('getIIIFUrls should return a list of URLs', function () {
            var response;

            scope.document = mockDocument1;

            response = scope.getIIIFUrls();

            expect(response).toEqual([]);

            scope.document.publishedLocations.push({repository: 1, url: 'http://localhost'});
            scope.document.publishedLocations.push({repository: 2, url: 'http://localhost'});

            response = scope.getIIIFUrls();

            expect(response.length).toEqual(4);
        });
        it('getRepositoryById should return a repository', function () {
            var response;

            response = scope.getRepositoryById(scope.repositories[0].id);

            expect(response).toBe(scope.repositories[0]);

            response = scope.getRepositoryById(-1);

            expect(response).toBe(null);
        });
        it('push should push a document', function () {
            delete scope.document.status;

            scope.document = mockDocument1;
            createMockMethods();

            spyOn(scope.document, 'push').and.callThrough();
            spyOn(scope, 'openModal');

            scope.push();

            expect(scope.document.push).toHaveBeenCalled();
            expect(scope.openModal).toHaveBeenCalled();
        });
        it('removeMetadataField should remove a specific metadata field', function () {
            var length;

            scope.document = {
                fields: {
                    a: {
                        values: ["first", "second"]
                    }
                }
            };
            scope.document.dirty = function() {};
            length = scope.document.fields.a.values.length;

            spyOn(scope.document, 'dirty');

            scope.removeMetadataField(scope.document.fields.a, 0);

            expect(scope.document.fields.a.values.length).toEqual(length - 1);
            expect(scope.document.dirty).toHaveBeenCalled();
        });
        it('requiredFieldsPresent should return a boolean', function () {
            var response;

            scope.document = {
                fields: {
                    a: {
                        label: {
                            profile: {
                                required: true
                            }
                        }
                    }
                }
            };

            response = scope.requiredFieldsPresent();

            expect(response).toBe(true);

            scope.document = {
                fields: {
                    a: {
                        label: {
                            profile: {
                                required: false
                            }
                        }
                    }
                }
            };

            response = scope.requiredFieldsPresent();

            expect(response).toBe(false);
        });
        it('requiresCuration should submit a document as requires curation', function () {
            delete scope.document.status;

            spyOn(scope.document, 'save').and.callThrough();

            scope.requiresCuration();

            expect(scope.document.status).toEqual("Requires Curation");
            expect(scope.document.save).toHaveBeenCalled();
        });
        it('save should save a document', function () {
            scope.openModal = function() {};
            scope.closeModal = function() {};
            scope.document = mockDocument1;
            createMockMethods();

            spyOn(scope, 'openModal');
            spyOn(scope.document, 'save').and.callThrough();

            scope.save();
            scope.$digest;

            expect(scope.document.save).toHaveBeenCalled();
            expect(scope.openModal).toHaveBeenCalled();
        });
        it('submit should submit a document as annotated', function () {
            scope.openModal = function() {};
            scope.closeModal = function() {};
            scope.document = mockDocument1;
            createMockMethods();

            spyOn(scope, 'openModal');
            spyOn(scope.document, 'save').and.callThrough();

            scope.submit();
            scope.$digest;

            expect(scope.document.status).toEqual("Annotated");
            expect(scope.document.save).toHaveBeenCalled();
            expect(scope.openModal).toHaveBeenCalled();
        });
        it('submitRejection should save a document as rejected', function () {
            var notes = "notes";

            scope.document = mockDocument1;
            createMockMethods();

            spyOn(scope.document, 'save').and.callThrough();

            scope.submitRejection(notes);
            scope.$digest;

            expect(scope.document.status).toEqual("Rejected");
            expect(scope.document.notes).toBe(notes);
            expect(scope.document.save).toHaveBeenCalled();
        });
    });

});
