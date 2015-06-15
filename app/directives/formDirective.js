metadataTool.directive('forminput', function () {
	return {
		templateUrl: 'views/forms/input.html',
		restrict: 'E',
		replace: true
	};
});

metadataTool.directive('formtextarea', function () {
	return {
		templateUrl: 'views/forms/textarea.html',
		restrict: 'E',
		replace: true
	};
});

metadataTool.directive('formlabel', function () {
	return {
		scope: {
			text: '@text'
		},
		templateUrl: 'views/forms/label.html',
		restrict: 'E',
		replace: true
	};
});