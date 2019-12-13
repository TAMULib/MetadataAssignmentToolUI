metadataTool.controller('ProjectController', function ($q, $controller, $scope, AlertService, UserService, ProjectRepo, ProjectRepositoryRepo, ProjectAuthorityRepo, ProjectSuggestorRepo, MetadataRepo) {

    angular.extend(this, $controller('AbstractController', {$scope: $scope}));

    $scope.user = UserService.getCurrentUser();

    $scope.projects = [];

    $scope.projectServices = {};

    $scope.updateableProjectServices = {};

    $scope.newProject = {};
    $scope.newProjectServices = {};

    $scope.ingestTypes = [];
    $scope.inputTypes = [];

    $scope.isEditing = false;
    $scope.isSyncing = false;

    $scope.setFieldProfileForm = function(profile) {
        if (profile) {
            $scope.fieldProfileFormTitle = "Editing "+profile.gloss;
            $scope.managingProfile = profile;
            $scope.isEditing = true;
            ProjectRepo.getFieldProfileLabels(profile.id).then(function(data) {
                $scope.managingLabels = angular.fromJson(data.body).payload.LinkedHashSet;
            });

        } else {
            $scope.fieldProfileFormTitle = "Add Field Profile";
            $scope.managingProfile = {};
            $scope.managingLabels = [];
            $scope.isEditing = false;
        }
    };

    UserService.userReady().then(function() {

      if ($scope.isAdmin() || $scope.isManager()) {
        $scope.projectServices.repositories = ProjectRepositoryRepo.getAll();
        $scope.projectServices.authorities = ProjectAuthorityRepo.getAll();
        $scope.projectServices.suggestors = ProjectSuggestorRepo.getAll();

        $scope.ingestTypes = ProjectRepo.getIngestTypes().then(function(data) {
            $scope.ingestTypes = angular.fromJson(data.body).payload["ArrayList<IngestType>"];
        });

        $scope.inputTypes = ProjectRepo.getInputTypes().then(function(data) {
            $scope.inputTypes = angular.fromJson(data.body).payload["ArrayList<InputType>"];
        });

        $scope.projects = ProjectRepo.getAll();

        $scope.delete = function(project) {
            manageProject('delete', project);
        };

        $scope.update = function(project) {
            angular.forEach($scope.updateableProjectServices, function(serviceIndexes, serviceType) {
                project[serviceType] = [];
                angular.forEach(serviceIndexes, function(isPresent, index) {
                    if (isPresent) {
                        project[serviceType].push($scope.projectServices[serviceType][index]);
                    }

                });
            });
            project.dirty(true);
            manageProject('save', project);
        };

        $scope.create = function(newProject,newProjectServices) {
            angular.forEach(newProjectServices, function(serviceIndexes, serviceType) {
                newProject[serviceType] = [];
                angular.forEach(serviceIndexes, function(isPresent, index) {
                    if (isPresent) {
                        newProject[serviceType].push($scope.projectServices[serviceType][index]);
                    }

                });
            });

            manageProject('create',newProject).then(function() {
                $scope.newProject = {};
                $scope.newProjectServices = {};
            });
        };

        $scope.resetFieldProfileForm = function () {
            $scope.closeModal();
            $scope.setFieldProfileForm();

            if ($scope.project) {
              var facets = [
                "project/" + $scope.project.id + "/add-field-profile",
                "project/" + $scope.project.id + "/update-field-profile"
              ];

              var alerts;
              var j;
              for (var i in facets) {
                alerts = AlertService.get(facets[i]);

                if (alerts) {
                  for (j in alerts.list) {
                    AlertService.remove(alerts.list[j]);
                  }
                }
              }
            }
        };

        $scope.onCancelFieldProfileForm = function () {
            $scope.resetFieldProfileForm();
        };

        $scope.projectHasService = function (project, serviceType, index) {
            var hasService = false;

            angular.forEach(project[serviceType], function (projectService) {
                if (projectService.id == $scope.projectServices[serviceType][index].id) {
                    hasService = true;
                    return true;
                }
            });
            return hasService;
        };

        var manageProject = function(method,project) {
            return ProjectRepo[method](project).then(function() {
                $scope.resetFieldProfileForm();
            });
        };

        /*
        *   Field Profile Management
        */

        $scope.updateFieldProfile = function(projectId, profile, labels) {
            var success = false;
            if ($scope.isEditing) {
                ProjectRepo.updateFieldProfile(projectId, profile, labels).then(function(data) {
                    if (processRestResponse(data)) {
                        $scope.setFieldProfileForm();
                    }
                });
            } else {
                ProjectRepo.addFieldProfile(projectId, profile, labels).then(function(data) {
                    if (processRestResponse(data)) {
                        $scope.setFieldProfileForm();
                    }
                });
            }
        };

        /*
         * Processes Rest response for modal context
         * Writes error message to provided model
         *
         * returns null on error, the parsed server response on success
         *
         */

        var processRestResponse = function (data) {
            var response = angular.fromJson(data.body);
            if (response.status === 500 || response.meta.status === "ERROR") {
                return false;
            }
            return true;
        };

        $scope.syncDocuments = function (project) {
            $scope.isSyncing = true;
            ProjectRepo.syncDocuments(project.id).then(function (rawResponse) {
                var response = angular.fromJson(rawResponse.body);
                if (response.meta.status === "SUCCESS") {
                  AlertService.add(response.meta, "app/projects");
                }
                $scope.resetFieldProfileForm();
                $scope.isSyncing = false;
            });
        };

        $scope.resetFieldProfileForm();
      }
    });

});
