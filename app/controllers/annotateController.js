metadataTool.controller('AnnotateController', function($controller, $scope, $location, $routeParams, $timeout, ControlledVocabulary, DocumentRepo, Metadata, StorageService, User, TXT, PDF) {

	angular.extend(this, $controller('AbstractController', {$scope: $scope}));

	$scope.user = User.get();

	$scope.document = DocumentRepo.get($routeParams.documentKey);
	
	$scope.document.name = $routeParams.documentKey;

	$scope.txt = TXT.get($scope.document.name);

	$scope.pdf = PDF.get($scope.document.name);

	$scope.document.metadata = {};

	$scope.cv = ControlledVocabulary.get();

	User.ready().then(function() {
		
    });

	ControlledVocabulary.ready().then(function() {

		DocumentRepo.ready().then(function() {
		
			angular.extend($scope.document, {'metadata':Metadata.get($scope.document)});
			
			Metadata.ready().then(function() {

				for(var key in $scope.document.metadataLabels) {
					var metadataLabel = $scope.document.metadataLabels[key];
					if(!$scope.document.metadata[metadataLabel.label]) {
						if (metadataLabel.defaultValue) {
							$scope.document.metadata[metadataLabel.label] = [metadataLabel.defaultValue];
						} else {
							$scope.document.metadata[metadataLabel.label] = [''];
						}
					}
				}		
				$scope.removeMetadataField = function(label) {
					$scope.document.metadata[label].splice(Object.keys($scope.document.metadata[label]).length-1, 1);
				};
				
				$scope.addMetadataField = function(label,defaultValue) { 
					$scope.document.metadata[label][Object.keys($scope.document.metadata[label]).length] = (defaultValue) ? defaultValue:'';
				};
				
				$scope.getMetadataFieldCount = function(label) {
					return Object.keys($scope.document.metadata[label]).length;
				};
				
				$scope.updateMetadata = function(document) {
					Metadata.clear(document.name).then(function(data) {
						Metadata.add(document.name, document.metadata);
					});
				};
				
				$scope.submit = function(document) {
						Metadata.clear(document.name).then(function(data) {	
						Metadata.add(document.name, document.metadata);
						DocumentRepo.update(document.name, $scope.user, 'Annotated', '');
						$location.path('/assignments');					
					});
				};
				
				$scope.accept = function(document) {
						Metadata.clear(document.name).then(function(data) {	
						Metadata.add(document.name, document.metadata);
						DocumentRepo.update(document.name, $scope.document.annotator, 'Published', '');
						$location.path('/documents');					
					});
				};

				$scope.managerAnnotating = function() {
					return ($routeParams.action == 'annotate');
				};
				
				$scope.managerReviewing = function() {
					return ($routeParams.action == 'review');
				};
				
				$scope.submitRejection = function(rejectionNotes) {
					if(rejectionNotes) {
						DocumentRepo.update($scope.document.name, $scope.document.annotator, 'Rejected', rejectionNotes).then(function() {
							$timeout(function() {
								$location.path('/documents');
							}, 500);
						});
					}
				};
				
				$scope.requiresCuration = function(name) { 
					DocumentRepo.update(name, $scope.user, 'Requires Curation');
					$location.path('/assignments');
				};

				$scope.getControlledVocabulary = function(label) {
					if(typeof $scope.cv[label] === 'undefined') {
						return [];
					}
					return $scope.cv[label];
				};

				$scope.requiredFieldsPresent = function() {
					
					var requiredFieldsPresent = false

					for(var key in $scope.document.metadataLabels) {
						if($scope.document.metadataLabels[key]["required"]) {
							requiredFieldsPresent = true
							break;
						}
					}
					return requiredFieldsPresent;
				}
				
			});	
			
		});

	});
	
});
