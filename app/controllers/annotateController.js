metadataTool.controller('AnnotateController', function($controller, $scope, $location, $routeParams, Document, DocumentRepo, Metadata, User) {
	
	angular.extend(this, $controller('AbstractController', {$scope: $scope}));
	
	var user = User.get();
	
	$scope.document = Document.get($routeParams.documentKey);
	
	$scope.document.filename = $routeParams.documentKey;
	
	$scope.showModal = false;
	
	angular.extend($scope.document, {'metadata':Metadata.get($routeParams.documentKey)});
		
	$scope.updateMetadata = function(filename, status) {
		if(status == 'Pending') {
			if($scope.document.metadata.abstract.length > 0) {
				Metadata.add($scope.document, 'abstract', false, 0, status);
			}
			else {
				alert("Must have an abstract!");
			}		
			for(var index in $scope.document.metadata.committee) {
				Metadata.add($scope.document, 'committee', true, index, status);
			}
		}
		else {
			Metadata.publish($scope.document);
		}	
	};
	
	$scope.submit = function(filename) {		
		$scope.updateMetadata(filename, 'Pending');
		DocumentRepo.update(filename, user.uin, 'Annotated', '');
		$location.path('/assignments');
	};
	
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
	};
	
	$scope.accept = function(document) {
		$scope.updateMetadata(document.filename, 'Publish');
		DocumentRepo.update(document.filename, document.annotator, 'Published', '');
		$location.path('/documents');
	};
	
	$scope.reject = function(document) {
		$scope.showModal = true;
	};
	
	$scope.managerAnnotating = function() {
		return ($routeParams.action == 'annotate');
	};
	
	$scope.managerReviewing = function() {
		return ($routeParams.action == 'review');
	};
	
	$scope.submitRejection = function(document, rejectionNotes) {
		if(rejectionNotes) {
			DocumentRepo.update(document.filename, document.annotator, 'Rejected', rejectionNotes);
			$scope.showModal = false;
			$location.path('/documents');
		}
		else {
			$scope.validation = "Please enter text."
		}
	};
	
});