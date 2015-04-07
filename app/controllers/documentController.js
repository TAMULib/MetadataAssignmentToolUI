metadataTool.controller('DocumentController', function ($scope, $location, $filter, $timeout, DocumentRepo, User, UserRepo, ngTableParams) {

	var userRepo;
	
	var annotators = [];
	
	$scope.documents = DocumentRepo.get();

	$scope.user = User.get();
	
	$scope.tableParams = new ngTableParams({
        page: 1,
        count: 10,
        sorting: {
            filename: 'asc'
        },
        filter: {
            status: 'Open'
        }
    }, {
        total: 0,
        getData: function($defer, params) {
        	var data = $scope.documents.list;
			var filteredData = params.filter() ? $filter('filter')(data, params.filter()) : data;
			var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
			params.total(orderedData.length);
            $scope.docs = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
            $defer.resolve($scope.docs);
        }
    });

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
	};

	DocumentRepo.listen().then(null, null, function(data) {
		var res = JSON.parse(data.body).content.HashMap;
		if(res.isNew == "true") {
			var key = $scope.documents.list.push(res.document);
		}
		else {
			for(var key in $scope.documents.list) {
				var doc = $scope.documents.list[key];
				if(doc.filename == res.document.filename) {
					$scope.documents.list[key] = res.document;
				}
			}
		}
		$scope.tableParams.reload();
		//$scope.tableParams.reloadPages();
	});
	
});
