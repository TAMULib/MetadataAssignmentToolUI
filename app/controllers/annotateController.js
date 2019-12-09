metadataTool.controller('AnnotateController', function ($controller, $location, $routeParams, $q, $scope, $timeout, AlertService, ControlledVocabularyRepo, DocumentRepo, ResourceRepo, StorageService, UserService, ProjectRepositoryRepo, ApiResponseActions, WsApi) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    $scope.user = UserService.getCurrentUser();

    var documentPromise = DocumentRepo.get($routeParams.projectKey, $routeParams.documentKey);

    var resourcesPromise = ResourceRepo.getAllByProjectNameAndDocumentName($routeParams.projectKey, $routeParams.documentKey);

    $scope.cv = ControlledVocabularyRepo.getAll();

    $scope.repositories = ProjectRepositoryRepo.getAll();

    $scope.action = $routeParams.action;

    $scope.loadingText = "Loading...";

    $scope.publishingEvents = [];

    var types = appConfig.contentMap;

    $q.all([documentPromise, resourcesPromise, ControlledVocabularyRepo.ready(), ProjectRepositoryRepo.ready()]).then(function (args) {

        $scope.document = args[0];

        $scope.resources = args[1];

        var emptyFieldValue = function (field) {
            return {
                field: field.id,
                value: field.label.profile.defaultValue ? field.label.profile.defaultValue : ''
            };
        };

        for (var k in $scope.document.fields) {
            var field = $scope.document.fields[k];
            if (field.values.length === 0) {
                field.values.push(emptyFieldValue(field));
            }
        }

        $scope.document.getSuggestions().then(function (response) {
            var payload = angular.fromJson(response.body).payload;
            $scope.suggestions = payload["ArrayList<Suggestion>"] !== undefined ? payload["ArrayList<Suggestion>"] : payload.ArrayList;
        });

        $scope.hasFileType = function (type) {
            for (var k in $scope.resources) {
                var resource = $scope.resources[k];
                if (types[type].indexOf(resource.mimeType) >= 0) {
                    return true;
                }
            }
            return false;
        };

        $scope.getFilesOfType = function (type) {
            if ($scope.resources === undefined) {
                return [];
            }
            return $scope.resources.filter(function (resource) {
                return types[type].indexOf(resource.mimeType) >= 0;
            });
        };

        $scope.removeMetadataField = function (field, index) {
            $scope.document.dirty(true);
            field.values.splice(index, 1);
        };

        $scope.addMetadataField = function (field) {
            $scope.document.dirty(true);
            field.values.push(emptyFieldValue(field));
        };

        $scope.save = function () {
            $scope.loadingText = "Saving...";
            $scope.openModal('#pleaseWaitDialog');
            $scope.document.save().then(function (data) {
                $scope.closeModal();
            });
        };

        $scope.submit = function () {
            $scope.loadingText = "Submitting...";
            $scope.openModal('#pleaseWaitDialog');
            $scope.document.status = 'Annotated';
            $scope.document.save().then(function (data) {
                $scope.closeModal();
                $timeout(function () {
                    $location.path('/assignments');
                }, 500);
            });
        };

        $scope.cannotPublish = function () {
            return $scope.document.publishing === true;
        };

        $scope.accept = function () {
            $scope.loadingText = "Accepting...";
            $scope.openModal('#pleaseWaitDialog');
            $scope.document.status = 'Accepted';
            $scope.document.notes = '';
            $scope.document.save().then(function (data) {
                $scope.closeModal();
                $scope.action = 'view';
            });
        };

        $scope.push = function () {
            $scope.loadingText = "Pushing document to registered repositories...";
            $scope.document.push().then(function (data) {
                $scope.action = 'view';
            });
        };

        $scope.managerAnnotating = function () {
            return ($routeParams.action == 'annotate');
        };

        $scope.managerReviewing = function () {
            return ($routeParams.action == 'review');
        };

        $scope.submitRejection = function (rejectionNotes) {
            $scope.document.status = 'Rejected';
            $scope.document.notes = rejectionNotes;
            $scope.document.save().then(function () {
                $timeout(function () {
                    $location.path('/documents');
                }, 500);
            });
        };

        $scope.requiresCuration = function () {
            $scope.document.status = 'Requires Curation';
            $scope.document.save();
            $location.path('/assignments');
        };

        $scope.delete = function (document) {
            document.delete().then(function (response) {
                var apiRes = angular.fromJson(response.body);
                if (apiRes.meta.status === 'SUCCESS') {
                    $location.path('/assignments');
                    $timeout(function () {
                        AlertService.add(apiRes.meta, "app/documents");
                    });
                }
            });
        };

        $scope.getControlledVocabulary = function (label) {
            if (typeof $scope.cv[label] === 'undefined') {
                return [];
            }
            return $scope.cv[label];
        };

        $scope.requiredFieldsPresent = function () {
            for (var k in $scope.document.fields) {
                if ($scope.document.fields[k].label.profile.required) {
                    return true;
                }
            }
            return false;
        };

        $scope.addSuggestion = function (field, suggestion) {
            $scope.document.dirty(true);
            if (field.values[0].value.length === 0) {
                field.values[0].value = suggestion.value;
            } else {
                var suggestedFieldValue = emptyFieldValue(field);
                suggestedFieldValue.value = suggestion.value;
                field.values.push(suggestedFieldValue);
            }
        };

        var getSetting = function (settings, key) {
            for (var i in settings) {
                if (settings.hasOwnProperty(i)) {
                    var setting = settings[i];
                    if (setting.key === key) {
                        return setting;
                    }
                }
            }
        };

        $scope.getIIIFUrls = function () {
            var urls = [];
            for (var i in $scope.document.publishedLocations) {
                if ($scope.document.publishedLocations.hasOwnProperty(i)) {
                    var publishedLocation = $scope.document.publishedLocations[i];
                    var publishedRepository = $scope.getRepositoryById(publishedLocation.repository);
                    if (publishedRepository !== undefined) {
                        if (publishedRepository.type === 'FEDORA_PCDM') {
                            var fedoraUrl = getSetting(publishedRepository.settings, 'repoUrl').values[0];
                            var fedoraRestPath = getSetting(publishedRepository.settings, 'restPath').values[0];
                            var fedoraRestBaseUrl = fedoraUrl + '/' + fedoraRestPath + '/';
                            var containerContextPath = publishedLocation.url.replace(fedoraRestBaseUrl, '');
                            urls.push(appConfig.iiifService + '/fedora/presentation?context=' + containerContextPath);
                            urls.push(appConfig.iiifService + '/fedora/collection?context=' + containerContextPath.substring(0, containerContextPath.lastIndexOf('/')).replace('_objects', ''));
                        } else if (publishedRepository.type === 'DSPACE') {
                            var dspaceUrl = getSetting(publishedRepository.settings, 'repoUrl').values[0];
                            var dspaceXmluiPath = getSetting(publishedRepository.settings, 'repoContextPath').values[0];
                            var dspaceXmluiBaseUrl = dspaceUrl + '/' + dspaceXmluiPath + '/';
                            var handlePath = publishedLocation.url.replace(dspaceXmluiBaseUrl, '');
                            urls.push(appConfig.iiifService + '/dspace/presentation?context=' + handlePath);
                            urls.push(appConfig.iiifService + '/dspace/collection?context=' + handlePath);
                        }
                    }
                }
            }
            return urls;
        };

        $scope.getRepositoryById = function (repositoryId) {
            for (var i in $scope.repositories) {
                if ($scope.repositories.hasOwnProperty(i)) {
                    if (repositoryId === $scope.repositories[i].id) {
                        return $scope.repositories[i];
                    }
                }
            }
        };

        WsApi.listen("/channel/publishing/document/" + $scope.document.id).then(null, null, function (rawResponse) {
            var response = angular.fromJson(rawResponse.body);

            if (response.meta.action === "BROADCAST") {
              if (response.payload.PublishingEvent) {
                $scope.publishingEvents.unshift(response.payload.PublishingEvent);
              }
            }
        });
    });

    DocumentRepo.listen([ApiResponseActions.UPDATE, ApiResponseActions.DELETE], function (response) {
        if (response.meta.action === "UPDATE") {
          if (response.payload && response.payload.Document && response.payload.Document.publishing === false && $scope.publishingEvents.length) {
            $scope.publishingEvents.length = 0;
          }
        } else if (response.meta.action === "DELETE") {
          $scope.publishingEvents.length = 0;
        }
    });

});

metadataTool.filter('selected', function () {
    return function (suggestions, fieldValues) {
        var output = [];
        for (var i in suggestions) {
            var suggestion = suggestions[i];
            var suggest = true;
            for (var j in fieldValues) {
                if (suggestion.value == fieldValues[j].value) {
                    suggest = false;
                }
            }
            if (suggest) {
                output.push(suggestion);
            }
        }
        return output;
    };
});
