metadataTool.controller('AnnotateController', function ($controller, $http, $location, $routeParams, $route, $q, $scope, $timeout, ControlledVocabularyRepo, DocumentRepo, ResourceRepo, StorageService, UserService) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    $scope.user = UserService.getCurrentUser();

    $scope.document = DocumentRepo.get($routeParams.projectKey, $routeParams.documentKey);

    $scope.cv = ControlledVocabularyRepo.getAll();

    $scope.action = $routeParams.action;

    $scope.loadingText = "Loading...";

    $q.all([$scope.document.ready(), ControlledVocabularyRepo.ready(), ResourceRepo.getAllByDocumentName($routeParams.documentKey)]).then(function (data) {

        $scope.resources = angular.fromJson(data[2].body).payload['ArrayList<Resource>'];

        console.log($scope.resources);

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

        var types = {
            text: ['text/plain'],
            pdf: ['application/pdf'],
            image: ['image/jpeg', 'image/jpg', 'image/jp2', 'image/jpx', 'image/svg', 'image/bmp', 'image/gif', 'image/png', 'image/tif', 'image/tiff']
        };

        var selected = {
            text: 0,
            pdf: 0,
            image: 0
        };

        var transition = function () {
            $scope.loading = true;
            $scope.switching = true;
            $timeout(function () {
                $scope.loading = false;
            }, 1000);
            $timeout(function () {
                $scope.switching = false;
            }, 250);
        };

        $scope.hasFileType = function (type) {
            for (var k in $scope.resources) {
                var resource = $scope.resources[k];
                if (types[type].indexOf(resource.mimeType) >= 0) {
                    return true;
                }
            }
            return false;
        };

        $scope.active = $scope.hasFileType('text') ? 'text' : $scope.hasFileType('pdf') ? 'pdf' : $scope.hasFileType('image') ? 'image' : undefined;

        $scope.select = function (type) {
            $scope.active = type;
        };

        $scope.getFiles = function () {
            if ($scope.resources === undefined) {
                return [];
            }
            return $scope.resources.filter(function (resource) {
                return types[$scope.active].indexOf(resource.mimeType) >= 0;
            });
        };

        $scope.selected = function () {
            return selected[$scope.active];
        };

        $scope.next = function () {
            if ($scope.selected() < $scope.getFiles().length - 1) {
                transition();
                selected[$scope.active]++;
            }
        };

        $scope.previous = function () {
            if ($scope.selected() > 0) {
                transition();
                selected[$scope.active]--;
            }
        };

        $scope.removeMetadataField = function (field, index) {
            field.values.splice(index, 1);
        };

        $scope.addMetadataField = function (field) {
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
            $scope.openModal('#pleaseWaitDialog');
            $scope.document.push().then(function (data) {
                $scope.closeModal();
                $scope.action = 'view';
                $scope.document = DocumentRepo.get($routeParams.projectKey, $routeParams.documentKey);
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
            if (field.values[0].value.length === 0) {
                field.values[0].value = suggestion.value;
            } else {
                var suggestedFieldValue = emptyFieldValue(field);
                suggestedFieldValue.value = suggestion.value;
                field.values.push(suggestedFieldValue);
            }
        };

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
