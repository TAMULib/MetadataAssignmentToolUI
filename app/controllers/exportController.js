metadataTool.controller('ExportController', function ($controller, $scope, AlertService, MetadataRepo, ProjectRepo) {

    angular.extend(this, $controller('AbstractController', {$scope: $scope}));
 
	$scope.formats = ["csv", "saf"];

	$scope.format = $scope.formats[0];
	
	$scope.projects = ProjectRepo.getAll();

	ProjectRepo.ready().then(function() {
		$scope.project = $scope.projects[0];
	});

	$scope.export = function(project, format) {

		console.log("Exporting " + format + " for " + project + " project");

		if(format == "saf") {			
			MetadataRepo.export(project, format).then(function(data) {
				ProjectRepo.reset();
			});
		}
		else if(format == "csv") {
			$scope.headers = [];

			return MetadataRepo.getHeaders(project).then(function(data) {
				
				var headers = JSON.parse(data.body).payload["ArrayList<String>"];
				
				for(var key in headers) {
					$scope.headers.push(headers[key]);
				}

				return MetadataRepo.export(project, format).then(function(data) {
					AlertService.add(JSON.parse(data.body).meta, "app/export");
					console.log(JSON.parse(data.body))
					return JSON.parse(data.body).payload["ArrayList<ArrayList>"];
				});

			});
		}
			
	};

	$scope.unlock = function(project) {
		MetadataRepo.unlockProject(project).then(function() {
			ProjectRepo.reset();
		});
	};
	
});
