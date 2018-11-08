metadataTool.directive("contentViewer", function($filter) {
    var viewerMap = appConfig.contentMap;
    return {
        require: '^^contentTabs',
        templateUrl: "views/directives/viewers/viewerWrapper.html",
        scope: {
          resource: "@",
          title: "@"
        },
        link:
            function($scope, element, attrs, contentTabs) {
                contentTabs.addPane($scope);

                var viewerTemplate = "default";
/*
                typeLoop:
                for (var type in viewerMap) {
                    for (var supportedType in viewerMap[type]) {
                        if ($scope.contentType === viewerMap[type][supportedType]) {
                            viewerTemplate = type;
                            break typeLoop;
                        }
                    }
                }

                if (viewerTemplate == 'seadragon') {
                  $scope.options = {};
                  $scope.options.prefixUrl = appConfig.basePath + '/resources/images/openseadragon/';
                  $scope.options.tileSources = [$filter("cantaloupeUrl")($scope.resource)];
                }
*/
                $scope.includeTemplateUrl = "views/directives/viewers/" + viewerTemplate + "Viewer.html";

        },
        restrict: "E",
        transclude: true
    };
});
