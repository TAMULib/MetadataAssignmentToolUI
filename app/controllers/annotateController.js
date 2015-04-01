metadataTool.controller('AnnotateController', function($scope, $routeParams, Document) {
	
	$scope.document = Document.get($routeParams.documentKey);
		
});