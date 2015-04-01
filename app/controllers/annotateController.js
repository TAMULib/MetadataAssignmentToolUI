metadataTool.controller('AnnotateController', function($scope, $routeParams, Document) {
		console.log($routeParams);
		
		$scope.document = Document.get($routeParams.documentKey);
		console.log($scope.document)
});