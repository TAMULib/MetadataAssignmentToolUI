metadataTool.controller('ProjectController', function ($controller, $scope, UserService, ProjectRepo, ProjectRepositoryRepo, ProjectAuthorityRepo, ProjectSuggestorRepo, MetadataRepo) {

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

    $scope.displayResponse = {"status":null,"message":null};

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

    $scope.setFieldProfileForm();

    UserService.userReady().then(function() {

    if($scope.isAdmin() || $scope.isManager()) {
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

        $scope.delete = function(project) {
            manageProject('delete', project);
        };

        $scope.projectHasService = function(project, serviceType, index) {
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
                $scope.closeModal();
            });
        };

        /*
        *   Field Profile Management
        */

        $scope.updateFieldProfile = function(projectId, profile, labels) {
            var success = false;
            if ($scope.isEditing) {
                ProjectRepo.updateFieldProfile(projectId, profile, labels).then(function(data) {
                    var response = processRestResponse(data, 'displayResponse');
                    if (response) {
                        $scope.setFieldProfileForm();
                    }
                });
            } else {
                ProjectRepo.addFieldProfile(projectId, profile, labels).then(function(data) {
                    var response = processRestResponse(data, 'displayResponse');
                    if (response) {
                        $scope.setFieldProfileForm();
                    }
                });
            }
        };

        $scope.clearDisplayResponse = function() {
            $scope.displayResponse = {"status":null,"message":null};
        };

        /*
         * Processes Rest response for modal context
         * Writes error message to provided model
         *
         * returns null on error, the parsed server response on success
         *
         */

        var processRestResponse = function(data, displayModelName) {
            var response = angular.fromJson(data.body);
            var result = null;
            if (response.status == 500) {
                $scope[displayModelName].status = false;
                $scope[displayModelName].message = response.error;
            } else if (response.meta.status == "ERROR") {
                $scope[displayModelName].status = false;
                $scope[displayModelName].message = response.meta.message;
            } else {
                $scope[displayModelName].status = true;
                $scope[displayModelName].message = response.meta.message;
                result = response;
            }
            return result;
        };
    }
  });

});
