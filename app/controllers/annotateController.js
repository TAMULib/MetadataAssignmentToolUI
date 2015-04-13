metadataTool.controller('AnnotateController', function($scope, $location, $routeParams, DocumentRepo, Metadata, User, TXT, PDF) {
	
	var annotator = User.get();
	$scope.document = {};


	$scope.document.name = $routeParams.documentKey;

	$scope.txt = TXT.get($scope.document.name);

	console.log($scope.txt);
		
	$scope.pdf = PDF.get($scope.document.name);

	logger.info($scope.pdf)
	
	angular.extend($scope.document, {'metadata':Metadata.get($routeParams.documentKey)});
		
	$scope.updateMetadata = function(name) {
		
		if($scope.document.metadata.abstract.length > 0) {
			Metadata.add($scope.document, 'abstract', false, 0);
		}
		else {
			alert("Must have an abstract!");
		}
		
		for(var index in $scope.document.metadata.committee) {
			Metadata.add($scope.document, 'committee', true, index);
		}
		
	}
	
	$scope.complete = function(name) {
		$scope.updateMetadata(name);
		DocumentRepo.update(name, annotator.uin, 'Complete');
		$location.path('/assignments');
	}
	
	$scope.readyToSubmit = function() {		
		var ready = false;
		if($scope.document.metadata.abstract) {
			ready = true;
		}
		var memberCount = 0;
		for(var index in $scope.document.metadata.committee) {
			if($scope.document.metadata.committee[index].length > 0) {
				memberCount++;
			}
		}
		if(memberCount == 0) {
			ready = false;
		}
		return ready;
	}
	
});