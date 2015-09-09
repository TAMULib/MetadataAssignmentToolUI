metadataTool.controller('AnnotateController', function($controller, $http, $location, $routeParams, $scope, $timeout, ControlledVocabulary, DocumentRepo, StorageService, User) {

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

			for(var k in $scope.document.fields) {
				var field = $scope.document.fields[k];
				if(field.values.length == 0) {
					field.values[0] = {'value' : (field.label.profile.defaultValue) ? field.label.profile.defaultValue : ''};
				}
			}

			$scope.removeMetadataField = function(field, value) {
				field.values.splice(field.values.length-1, 1);
			};
			
			$scope.addMetadataField = function(field) {
				field.values[field.values.length] = {'value': (field.label.profile.defaultValue) ? field.label.profile.defaultValue : ''};
			};
						
			$scope.save = function(document) {
				console.log(document);
				DocumentRepo.save(document).then(function(data) {
					console.log(data);
				});
			};
			
			$scope.submit = function(document) {
				DocumentRepo.save(document).then(function(data) {
					console.log(data);
					DocumentRepo.update(document.name, $scope.user, 'Annotated', '');
					$location.path('/assignments');	
				});
			};
			
			$scope.accept = function(document) {
				DocumentRepo.save(document).then(function(data) {
					console.log(data);
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
				for(var k in $scope.document.fields) {
					if($scope.document.fields[k].label.profile.required) {
						return true;
					}
				}
				return false;
			};
			
		});

	});
	
});
