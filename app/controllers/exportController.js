metadataTool.controller('ExportController', function ($controller, $scope, Metadata) {

    angular.extend(this, $controller('AbstractController', {$scope: $scope}));

	$scope.format = "saf";
	$scope.projects = [];

	metadataTool.getProjects = function() {
		Metadata.getProjects().then(function(data) {
			var projects = JSON.parse(data.body).payload["ArrayList<ProjectMinimal>"];
			if(typeof projects != 'undefined') {
				$scope.projects = projects;
				if($scope.projects.length > 0) {
					$scope.project = $scope.projects[0];
				}		
				$scope.getProjects = function() {	
					return $scope.projects;
				};
			}
		});
	};

	metadataTool.getProjects();
	
	$scope.getFormats = function() {		
		return ["csv","saf"];
	};

	$scope.export = function(project, format) {

		console.log("Exporting " + format + " for " + project + " project");

		if(format == "saf") {			
			Metadata.export(project, format).then(function(data) {
				metadataTool.getProjects();
			});
		}
		else if(format == "csv") {
			$scope.headers = [];

			return Metadata.getHeaders(project).then(function(data) {
				
				var headers = JSON.parse(data.body).payload["ArrayList<String>"];
				
				for(var key in headers) {
					$scope.headers.push(headers[key]);
				}

				return Metadata.export(project, format).then(function(data) {
					return  JSON.parse(data.body).payload["ArrayList<ArrayList>"];
				});

			});
		}
			
	};

	$scope.unlock = function(project) {
		Metadata.unlockProject(project).then(function() {
			metadataTool.getProjects();
		});
	};
	
});
