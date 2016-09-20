metadataTool.directive('format', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function toModel(input) {
                return input.replace(/([\u0000-\u001f])/g, ' ');
            });

            ngModel.$formatters.push(function toView(input) {
                return input;
            });
        }
    };
});