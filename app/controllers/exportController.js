metadataTool.controller('ExportController', function ($controller, $scope, Metadata) {

    angular.extend(this, $controller('AbstractController', {$scope: $scope}));

	$scope.format = "saf";

	metadataTool.getProjects = function() {
		Metadata.getProjects().then(function(data) {

			rawProjects = JSON.parse(data.body).content["ArrayList<Object[]>"];
			$scope.projects = [];
			angular.forEach(rawProjects, function(project,k) {
				$scope.projects.push({"name":project[0],"isLocked":project[1]});
			});

			if($scope.projects.length > 0) {
				$scope.project = $scope.projects[0];
			}		
			$scope.getProjects = function() {	
				return $scope.projects;
			};
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
				
				var headers = JSON.parse(data.body).content["ArrayList<String>"];
				
				for(var key in headers) {
					$scope.headers.push(headers[key]);
				}

				return Metadata.export(project, format).then(function(data) {
					return  JSON.parse(data.body).content["ArrayList<ArrayList>"];
				});

			});
		}
			
	};
});
