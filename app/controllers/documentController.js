metadataTool.controller('DocumentController', function ($scope, Document) {

	$scope.documents = Document.get();
	
});

