metadataTool.directive('modal', function () {
	return {
		templateUrl: 'views/modalWrapper.html',
		restrict: 'E',
		replace:false,
		transclude: true,
		scope: {
			 method: "&"			
		},
		controller: "@",
		name: "modalController",
		link: function ($scope, element, attr) {
	    	
			$scope.attr = attr;
			
	    	$scope.click = function() {
	    		if($scope.attr.modalNgClickFunction && $scope.attr.modalNgClickParam) {
	    			$scope[$scope.attr.modalNgClickFunction](JSON.parse($scope.attr.modalNgClickParam));
	    		}
	    	}
	    	
	    }
	};
});