myLibrary.controller('DocumentController', function ($scope, Document) {

	$scope.documents = Document.get();
	
	console.log($scope.documents);
	
});

