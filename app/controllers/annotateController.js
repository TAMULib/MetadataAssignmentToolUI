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
	
	$scope.memberCount = function() {
		return Object.keys($scope.document.metadata.committee).length;
	};

	$scope.removeCommitteeMember = function() {
		delete $scope.document.metadata.committee[Object.keys($scope.document.metadata.committee).length-1];
	};
	
	$scope.addCommitteeMember = function() {
		$scope.document.metadata.committee[Object.keys($scope.document.metadata.committee).length] = '';
	};
	
	$scope.chairCount = function() {
		return Object.keys($scope.document.metadata.chair).length;
	};

	$scope.removeCommitteeChair = function() {
		delete $scope.document.metadata.chair[Object.keys($scope.document.metadata.chair).length-1];
	};
	
	$scope.addCommitteeChair = function() {
		$scope.document.metadata.chair[Object.keys($scope.document.metadata.chair).length] = '';
	};
	
	$scope.updateMetadata = function(name, status) {
		Metadata.clear(name).then(function(data) {			
			if($scope.document.metadata.abstract.length > 0) {
				Metadata.add($scope.document, 'abstract', false, 0, status);
			}
			else {
				alert("Must have an abstract!");
			}		
			for(var index in $scope.document.metadata.committee) {
				Metadata.add($scope.document, 'committee', true, index, status);
			}
			for(var index in $scope.document.metadata.chair) {
				Metadata.add($scope.document, 'chair', true, index, status);
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
	}
	
});