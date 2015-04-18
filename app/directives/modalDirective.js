metadataTool.directive('modal', function () {
	return {
		templateUrl: 'views/modal.html',
		restrict: 'E',
		transclude: true,
		scope: true,
		controller: "",
		link: function ($scope, element, attr) {
	    	$scope.modal = {
	    		id: attr["modalId"],
	    		title: attr["titleText"],
	    		btnView: attr["btnView"]
	    	}

	    	$scope.clicked = function(param) {
	    		console.log(param);
	    		$scope[attr.clickCall](param);
	    	}
	    }
	};
});