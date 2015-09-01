metadataTool.controller('ExportController', function ($controller, $scope, Metadata, Export) {

    angular.extend(this, $controller('AbstractController', {$scope: $scope}));

	$scope.exportFormat = "saf"

	$scope.exportMetadata = function(project) {
		
		logger.log("Exporting metadata for " + project);

		$scope.headers = [];
		
		return Metadata.getHeaders(project).then(function(data) {
			
			var headers = JSON.parse(data.body).content["ArrayList<String>"];
			
			for(var key in headers) {
				$scope.headers.push(headers[key]);
			}
			
			return Metadata.getPublishedByProject(project).then(function(data) {
				return  JSON.parse(data.body).content["ArrayList<ArrayList>"];
			});

		});
		
	};

	Metadata.getProjects().then(function(data) {
		$scope.projects = JSON.parse(data.body).content["ArrayList<String>"];
		if(typeof $scope.projects !== 'undefined') {
			$scope.project = $scope.projects[0];
		}		
		$scope.getProjects = function() {		
			return $scope.projects;
		};
	});
	
	$scope.getFormats = function() {		
		return ["csv","saf"];
	};

	$scope.export = function() {
	
		Export.execute($scope.project, $scope.exportFormat);
	
	}
	
});
