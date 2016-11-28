metadataTool.directive("metadatainput",  function() {
	return {
		templateUrl: 'views/directives/input.html',
		restrict: 'E',
		replace: true,
		transclude: false,
		scope: true,
		link: function($scope, element, attr) {
				$scope.inputTemplate = "views/input/" + $scope.field.label.profile.inputType.replace('_', '-').toLowerCase() + ".html";

				$scope.getPopoverTitle = function(suggestion) {
						var synonymCount = 0;
						for(var i in suggestion.synonyms) {
								synonymCount += suggestion.synonyms[i].occurrences;
						}
						return suggestion.value + ' (' + (suggestion.occurrences - synonymCount) + ')';
				};

				$scope.hasSuggestions = function(suggestions) {
						return suggestions && suggestions.length > 0;
				};

				$scope.suggestionsStatus = function(suggestions) {
						return suggestions != undefined ? suggestions.length : 'Loading...';
				};
		}
	};
});
