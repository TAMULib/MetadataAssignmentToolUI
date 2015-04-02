metadataTool.controller('AnnotateController', function($scope, $routeParams, Document, Metadata) {
	
	$scope.document = Document.get($routeParams.documentKey);
	
	//$scope.document = Metadata.get($routeParams.documentKey);
	
	$scope.document.filename = $routeParams.documentKey;
	
	$scope.document.abstract = 'Hello, World!';
	
	$scope.document.committee = {
		'1': 'George',
		'2': 'Jeb',
		'3': 'George W.'
	};
		
	$scope.updateMetadata = function(filename) {
		
		if($scope.document.abstract.length < 1) {
			alert("Must have an abstract!");
		}
		else {
			Metadata.add($scope.document, 'abstract', false, 0);
		}
		
		for(var member in $scope.document.committee) {
			Metadata.add($scope.document, 'committee', true, member);
		}
				
	}
	
	$scope.complete = function(filename) {
		
		console.log("Complete");
				
	}
	
});