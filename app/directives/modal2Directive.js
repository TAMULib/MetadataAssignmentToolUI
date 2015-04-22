metadataTool.directive('modal2', function () {
	return {
		templateUrl: 'views/modal2Wrapper.html',
		restrict: 'E',
		replace:false,
		transclude: true,
		scope: false,
		link: function ($scope, element, attr) {
	    	
			$scope.attr = attr;
			
	    }
	};
});