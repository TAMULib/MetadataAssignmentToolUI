metadataTool.controller('ExportController', function ($controller, $scope, AlertService, MetadataRepo, ProjectRepo) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    $scope.formats = ["dspace-csv", "dspace-saf", "spotlight-csv"];

    $scope.format = $scope.formats[0];

    $scope.projects = ProjectRepo.getAll();

    ProjectRepo.ready().then(function () {
        $scope.project = $scope.projects[0];
    });

    $scope.isExporting = false;

    $scope.export = function (project, format) {

        $scope.isExporting = true;

        if (format === "dspace-saf") {
            MetadataRepo.export(project, format).then(function (response) {
                ProjectRepo.reset();
                $scope.closeModal();
                $scope.isExporting = false;
                AlertService.add(angular.fromJson(response.body).meta, "app/export");
            });
        } else if (format === "dspace-csv" || format === "spotlight-csv") {

            $scope.headers = [];

            return MetadataRepo.getHeaders(format, project).then(function (data) {
                var headers = angular.fromJson(data.body).payload["ArrayList<String>"];

                for (var key in headers) {
                    $scope.headers.push(headers[key]);
                }

                return MetadataRepo.export(project, format).then(function (response) {
                    $scope.closeModal();
                    var resObj = angular.fromJson(response.body);
                    $scope.isExporting = false;
                    AlertService.add(resObj.meta, "app/export");
                    return resObj.payload["ArrayList<ArrayList>"];
                });

            });
        }

    };

    $scope.unlock = function (project) {
        MetadataRepo.unlockProject(project).then(function () {
            ProjectRepo.reset();
        });
    };

});
