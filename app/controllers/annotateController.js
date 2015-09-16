metadataTool.controller('AnnotateController', function($controller, $http, $location, $routeParams, $scope, $timeout, ControlledVocabulary, DocumentRepo, StorageService, User) {

	angular.extend(this, $controller('AbstractController', {$scope: $scope}));

	$scope.user = User.get();

	$scope.document = DocumentRepo.get($routeParams.documentKey);
	
	$scope.cv = ControlledVocabulary.get();

	User.ready().then(function() {
		
    });

	$scope.action = $routeParams.action;

    $scope.loadingText = "Loading...";

	ControlledVocabulary.ready().then(function() {

		DocumentRepo.ready().then(function() {

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
				$scope.loadingText = "Saving...";
				angular.element("#pleaseWaitDialog").modal();
				DocumentRepo.save(document).then(function(data) {
					angular.element("#pleaseWaitDialog").modal('hide');
				});
			};
			
			$scope.submit = function(document) {
				$scope.loadingText = "Submitting...";
				angular.element("#pleaseWaitDialog").modal();
				
				document.status = 'Annotated';

				DocumentRepo.save(document).then(function(data) {
					angular.element("#pleaseWaitDialog").modal('hide');
					$timeout(function() {
						$location.path('/assignments');
					}, 500);	
				});
			};
			
			$scope.accept = function(document) {
				$scope.loadingText = "Accepting...";
				angular.element("#pleaseWaitDialog").modal();
				
				document.status = 'Accepted';
				document.notes = '';

				DocumentRepo.save(document).then(function(data) {
					angular.element("#pleaseWaitDialog").modal('hide');
					$timeout(function() {
						$location.path('/documents');
					}, 500);
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
					DocumentRepo.update($scope.document.name, 'Rejected', $scope.document.annotator, rejectionNotes).then(function() {
						$timeout(function() {
							$location.path('/documents');
						}, 500);
					});
				}
			};
			
			$scope.requiresCuration = function(name) { 
				DocumentRepo.update(name, 'Requires Curation', $scope.user.firstName + " " $scope.user.lastName + " (" + $scope.user.uin + ")");
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
