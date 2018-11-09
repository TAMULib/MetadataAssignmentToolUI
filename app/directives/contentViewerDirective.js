metadataTool.directive("contentViewer", function($filter) {
    var viewerMap = appConfig.contentMap;
    return {
        require: '^^contentTabs',
        templateUrl: "views/directives/viewers/viewerWrapper.html",
        scope: {
            title: "@",
            type: "@",
            getFiles: "&"
        },
        link:
            function($scope, element, attrs, contentTabs) {
                contentTabs.addPane($scope);
                var viewerTemplate = $scope.type;

                if ($scope.type == 'image') {
                    $scope.options = {};
                    $scope.options.prefixUrl = appConfig.basePath + '/resources/images/openseadragon/';
                    $scope.options.tileSources = [];
                    $scope.options.sequenceMode = true;
                    $scope.options.nextButton = "next";
                    $scope.options.previousButton = "previous";

                    angular.forEach($scope.getFiles(),function(file) {
                        $scope.options.tileSources.push($filter("cantaloupeUrl")(file.url));
                    });
                }

                $scope.current = 0;

                $scope.next = function () {
                    if ($scope.current < $scope.getFiles().length - 1) {
                        $scope.current++;
                    }
                };

                $scope.previous = function () {
                    if ($scope.current > 0) {
                        $scope.current--;
                    }
                };

                $scope.includeTemplateUrl = "views/directives/viewers/" + viewerTemplate + "Viewer.html";
            },
        restrict: "E",
        transclude: true
    };
});
