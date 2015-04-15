metadataTool.controller('AnnotateController', function($controller, $scope, $location, $routeParams, DocumentRepo, Metadata, User, TXT, PDF) {
	
	angular.extend(this, $controller('AbstractController', {$scope: $scope}));
	
	var user = User.get();
	
	$scope.document = DocumentRepo.get($routeParams.documentKey);

	$scope.document.name = $routeParams.documentKey;

	$scope.txt = TXT.get($scope.document.name);

	$scope.pdf = PDF.get($scope.document.name);

	$scope.showModal = false;
	
	angular.extend($scope.document, {'metadata':Metadata.get($routeParams.documentKey)});
	
	console.log($scope.document);
	
	$scope.removeMetadataField = function(label) {
		console.log($scope.document.metadata[label][Object.keys($scope.document.metadata[label]).length-1]);
		delete $scope.document.metadata[label][Object.keys($scope.document.metadata[label]).length-1];
	};
	
	$scope.addMetadataField = function(label) {
		$scope.document.metadata[label][Object.keys($scope.document.metadata[label]).length] = '';
	};
	
	
	$scope.updateMetadata = function(name, status) {
		Metadata.clear(name).then(function(data) {			
			
			Metadata.add($scope.document, 'dc.abstract', false, 0, status);
				
			for(var index in $scope.document.metadata.committee) {
				Metadata.add($scope.document, 'dc.committee.member', true, index, status);
			}
			for(var index in $scope.document.metadata.chair) {
				Metadata.add($scope.document, 'dc.committee.chair', true, index, status);
			}

		});
	};
	
	$scope.submit = function(name) {
		Metadata.clear(name).then(function(data) {
			$scope.updateMetadata(name, 'Pending');
			DocumentRepo.update(name, user.uin, 'Annotated', '');
			$location.path('/assignments');
		});
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
		var chairCount = 0;
		for(var index in $scope.document.metadata.chair) {
			if($scope.document.metadata.chair[index].length > 0) {
				chairCount++;
			}
		}
		if(memberCount == 0 || chairCount == 0) {
			ready = false;
		}
		return ready;
	};
	
	$scope.accept = function(document) {
		Metadata.clear(document.name).then(function(data) {
			$scope.updateMetadata(document.name, 'Published');
			DocumentRepo.update(document.name, document.annotator, 'Published', '');
			$location.path('/documents');
		});
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
			DocumentRepo.update(document.name, document.annotator, 'Rejected', rejectionNotes);
			$scope.showModal = false;
			$location.path('/documents');
		}
		else {
			$scope.validation = "Please enter text."
		}
	};
	
	$scope.requiresCuration = function(name) {
		DocumentRepo.update(name, user.uin, 'Requires Curation');
		$location.path('/assignments');
	};
	
});