metadataTool.controller('AnnotateController', function($scope, $routeParams, Document, DocumentRepo, Metadata, User) {
	
	var annotator = User.get();
	
	$scope.document = Document.get($routeParams.documentKey);
	
	$scope.document.filename = $routeParams.documentKey;
	
	angular.extend($scope.document, {'metadata':Metadata.get($routeParams.documentKey)});
		
	$scope.updateMetadata = function(filename) {
		
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
	
	$scope.complete = function(filename) {		
		DocumentRepo.update(filename, annotator.uin, 'Complete');		
	}
	
});