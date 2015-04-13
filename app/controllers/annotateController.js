metadataTool.controller('AnnotateController', function($scope, $location, $routeParams, Document, DocumentRepo, Metadata, User) {
	
	var annotator = User.get();
	
	$scope.document = Document.get($routeParams.documentKey);
	
	$scope.document.filename = $routeParams.documentKey;
	
	angular.extend($scope.document, {'metadata':Metadata.get($routeParams.documentKey)});
	
	$scope.memberCount = function() {
		return Object.keys($scope.document.metadata.committee).length;
	};
		
	$scope.removeCommitteeMember = function() {
		delete $scope.document.metadata.committee[Object.keys($scope.document.metadata.committee).length-1];
	};
	
	$scope.addCommitteeMember = function() {
		$scope.document.metadata.committee[Object.keys($scope.document.metadata.committee).length] = '';
	};
	
	$scope.updateMetadata = function(filename) {
		Metadata.clear(filename).then(function(data) {
			if($scope.document.metadata.abstract.length > 0) {
				Metadata.add($scope.document, 'abstract', false, 0);
			}
			else {
				alert("Must have an abstract!");
			}
			
			for(var index in $scope.document.metadata.committee) {
				Metadata.add($scope.document, 'committee', true, index);
			}
		});
	};
	
	$scope.complete = function(filename) {
		Metadata.clear(filename).then(function(data) {
			$scope.updateMetadata(filename);
			DocumentRepo.update(filename, annotator.uin, 'Complete');
			$location.path('/assignments');
		});
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