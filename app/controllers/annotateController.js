metadataTool.controller('AnnotateController', function($controller, $http, $location, $routeParams, $scope, $timeout, ControlledVocabulary, DocumentRepo, Metadata, StorageService, User) {

	angular.extend(this, $controller('AbstractController', {$scope: $scope}));

	$scope.user = User.get();

	$scope.document = DocumentRepo.get($routeParams.documentKey);
	
	$scope.cv = ControlledVocabulary.get();

	User.ready().then(function() {
		
    });

	ControlledVocabulary.ready().then(function() {

		DocumentRepo.ready().then(function() {

			$http.get($scope.document.txtUri).then(function(response) {
				$scope.txt = response.data;
			});
		
			console.log($scope.document);

			$scope.removeMetadataField = function(field, value) {
				field.values.splice(field.values.length-1, 1);
			};
			
			$scope.addMetadataField = function(field) {
				field.values[field.values.length] = {'value': (field.label.profile.defaultValue) ? field.label.profile.defaultValue : ''};
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
			};
			
		});

	});
	
});
