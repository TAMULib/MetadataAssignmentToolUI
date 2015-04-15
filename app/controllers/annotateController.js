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
		delete $scope.document.metadata[label][Object.keys($scope.document.metadata[label]).length-1];
	};
	
	$scope.addMetadataField = function(label) {
		$scope.document.metadata[label][Object.keys($scope.document.metadata[label]).length] = '';
	};
	
	$scope.getMetadataFieldCount = function(label) {
		return Object.keys($scope.document.metadata[label]).length;
	}
	
	$scope.updateMetadata = function(document, status) {
		Metadata.clear(document.name).then(function(data) {			
			
			console.log(document);
			
			for(var key in document.metadataLabels) {
				var metaDataLabel = document.metadataLabels[key];
				
				if(metaDataLabel.repeatable) {
					for(var index in document.metadata[metaDataLabel.label]) {
						Metadata.add(document, metaDataLabel.label, true, index, status);
					}
				}
				else {
					Metadata.add(document, metaDataLabel.label, false, 0, status);
				}
			}
			
		});
	};
	
	$scope.submit = function(document) {
		Metadata.clear(document.name).then(function(data) {
			
			$scope.updateMetadata(document, 'Pending');
			DocumentRepo.update(document.name, user.uin, 'Annotated', '');
			$location.path('/assignments');
			
		});
	};
	
	$scope.accept = function(document) {
		
		Metadata.clear(document.name).then(function(data) {
			
			$scope.updateMetadata(document, 'Published');
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