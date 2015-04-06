metadataTool.controller('DocumentController', function ($scope, $location, DocumentRepo, User, UserRepo) {

	var userRepo;
	
	var user = User.get();
	
	var annotators = [];
	
	$scope.documents = DocumentRepo.get();
	
	$scope.go = function(route) {
		 $location.path(route);
	}
	
	$scope.isAdmin = function() {
		if(sessionStorage.role == "ROLE_ADMIN") {
			return true;
		}
		return false;
	};
	
	$scope.isManager = function() {
		if(sessionStorage.role == "ROLE_MANAGER") {
			return true;
		}
		return false;
	};
	
	$scope.isAnnotator = function() {
		if(sessionStorage.role == "ROLE_ANNOTATOR") {
			return true;
		}
		return false;
	};
	
	$scope.availableAnnotators = function() {		
		if(!userRepo) {
			userRepo = UserRepo.get();
			for(var key in userRepo.list) {
				var user = userRepo.list[key];
				if(user.role == 'ROLE_ANNOTATOR' || user.role == 'ROLE_MANAGER') {
					annotators.push(user);
				}
			}
		}
		return annotators;
	};
	
	$scope.updateAnnotator = function(filename, status, annotator) {
		
		if(!annotator) {
			annotator = User.get();
		}
		else {
			annotator = JSON.parse(annotator);
		}
		
		DocumentRepo.update(filename, annotator.uin, status);
		
		for(var key in $scope.documents.list) {
			var doc = $scope.documents.list[key];
			if(doc.filename == filename) {
				$scope.documents.list[key].status = status;
			}
		}
		
	};
		
	$scope.isAssignedToMe = function(annotator) {
		return (annotator == user.uin);
	}
	
});

