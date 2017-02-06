metadataTool.run(function($route, $rootScope, $location) {

    angular.element("body").fadeIn(300);

    // Add runtime tasks here

    var original = $location.path;
    $location.path = function(path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function() {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };

});
