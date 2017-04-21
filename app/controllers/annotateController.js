metadataTool.controller('AnnotateController', function ($controller, $http, $location, $routeParams, $route, $q, $scope, $timeout, ControlledVocabularyRepo, DocumentRepo, StorageService, UserService) {

    angular.extend(this, $controller('AbstractController', {$scope: $scope}));

    $scope.user = UserService.getCurrentUser();

    $scope.document = DocumentRepo.get($routeParams.projectKey, $routeParams.documentKey);

    $scope.cv = ControlledVocabularyRepo.getAll();

    $scope.action = $routeParams.action;

    $scope.loadingText = "Loading...";

    $q.all([$scope.document.ready(), ControlledVocabularyRepo.ready()]).then(function() {

        $scope.document.getSuggestions().then(function(response) {
            var payload = angular.fromJson(response.body).payload;
            $scope.suggestions = payload["ArrayList<Suggestion>"] != undefined ? payload["ArrayList<Suggestion>"] : payload["ArrayList"];
        });

        var emptyFieldValue = function(field) {
            return {
                field: field.id,
                value: field.label.profile.defaultValue ? field.label.profile.defaultValue : ''
            };
        };

        for(var k in $scope.document.fields) {
            var field = $scope.document.fields[k];
            if(field.values.length === 0) {
                field.values.push(emptyFieldValue(field));
            }
        }

        $scope.removeMetadataField = function(field, index) {
            field.values.splice(index, 1);
        };

        $scope.addMetadataField = function(field) {
            field.values.push(emptyFieldValue(field));
        };

        $scope.save = function() {
            $scope.loadingText = "Saving...";
            $scope.openModal('#pleaseWaitDialog');
            $scope.document.save().then(function(data) {
                $scope.closeModal();
            });
        };

        $scope.submit = function() {
            $scope.loadingText = "Submitting...";
            $scope.openModal('#pleaseWaitDialog');
            $scope.document.status = 'Annotated';
            $scope.document.save().then(function(data) {
                $scope.closeModal();
                $timeout(function() {
                    $location.path('/assignments');
                }, 500);
            });
        };

        $scope.accept = function() {
            $scope.loadingText = "Accepting...";
            $scope.openModal('#pleaseWaitDialog');
            $scope.document.status = 'Accepted';
            $scope.document.notes = '';
            $scope.document.save().then(function(data) {
                $scope.closeModal();
                $scope.action = 'view';
            });
        };

        $scope.push = function() {
            $scope.loadingText = "Pushing document to registered repositories...";
            $scope.openModal('#pleaseWaitDialog');
            $scope.document.push().then(function(data) {
                $scope.closeModal();
                $scope.action = 'view';
                $scope.document = DocumentRepo.get($routeParams.projectKey, $routeParams.documentKey);
            });
        };

        $scope.managerAnnotating = function() {
            return ($routeParams.action == 'annotate');
        };

        $scope.managerReviewing = function() {
            return ($routeParams.action == 'review');
        };

        $scope.submitRejection = function(rejectionNotes) {
            $scope.document.status = 'Rejected';
            $scope.document.notes = rejectionNotes;
            $scope.document.save().then(function() {
                $timeout(function() {
                    $location.path('/documents');
                }, 500);
            });
        };

        $scope.requiresCuration = function() {
            $scope.document.status = 'Requires Curation';
            $scope.document.save();
            $location.path('/assignments');
        };

        $scope.getControlledVocabulary = function(label) {
            if(typeof $scope.cv[label] === 'undefined') {
                return [];
            }
            return $scope.cv[label];
        };

        $scope.requiredFieldsPresent = function() {
            for(var k in $scope.document.fields) {
                if($scope.document.fields[k].label.profile.required) {
                    return true;
                }
            }
            return false;
        };

        $scope.addSuggestion = function(field, suggestion) {
            if(field.values[0].value.length === 0) {
              field.values[0].value = suggestion.value;
            }
            else {
              var suggestedFieldValue = emptyFieldValue(field);
              suggestedFieldValue.value = suggestion.value;
              field.values.push(suggestedFieldValue);
            }
        };

    });

});

metadataTool.filter('selected', function() {
    return function(suggestions, fieldValues) {
        var output = [];
        for(var i in suggestions) {
          var suggestion = suggestions[i];
          var suggest = true;
          for(var j in fieldValues) {
              if(suggestion.value == fieldValues[j].value) {
                  suggest = false;
              }
          }
          if(suggest) {
            output.push(suggestion);
          }
        }
        return output;
    }
});
