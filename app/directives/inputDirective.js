metadataTool.directive("metadatainput",  function() {
	return {
		templateUrl: 'views/directives/input.html',
		restrict: 'E',
		replace: true,
		transclude: false,
		scope: true,
		link: function($scope, element, attr) {
			$scope.inputTemplate = "views/input/" + $scope.field.label.profile.inputType.replace('_', '-').toLowerCase() + ".html";
    }
	};
});
