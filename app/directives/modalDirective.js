metadataTool.directive('modal', function () {
	return {
		templateUrl: 'views/modalWrapper.html',
		restrict: 'E',
		replace:false,
		transclude: true,
		scope: false,
		controller: "@",
		name: "modalController",
		link: function ($scope, element, attr) {
	    	$scope.attr = attr;
	    }
	};
});