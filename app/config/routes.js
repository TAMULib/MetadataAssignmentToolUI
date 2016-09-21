metadataTool.config(['$routeProvider', '$locationProvider', '$sceDelegateProvider', function($routeProvider, $locationProvider, $sceDelegateProvider) {
    $locationProvider.html5Mode(true);
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        appConfig.webService + "/**"
    ]);
    $routeProvider.
        when('/users', {
            templateUrl: 'views/users.html'
        }).
        when('/assignments', {
            templateUrl: 'views/assignments.html'
        }).
        when('/documents', {
            templateUrl: 'views/documents.html'
        }).
        when('/myview', {
            templateUrl: 'views/myview.html'
        }).
        when('/annotate/:documentKey/:action', {
            templateUrl: 'views/annotate.html'
        }).
        when('/restrictedAccess', {
            templateUrl: 'views/restrictedAccess.html'
        }).
        otherwise({redirectTo: '/',
            templateUrl: 'views/home.html'
        });
}]);