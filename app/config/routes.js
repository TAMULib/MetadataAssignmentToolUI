metadataTool.config(['$routeProvider', '$locationProvider', '$sceDelegateProvider', function($routeProvider, $locationProvider, $sceDelegateProvider) {
    $locationProvider.html5Mode(true);
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        appConfig.webService + "/**"
    ]);
    $routeProvider.
    when('/home', {
        redirectTo: '/'
    }).
    when('/', {
        templateUrl: 'views/home.html'
    }).
    when('/users', {
        templateUrl: 'views/users.html'
    }).
    when('/projects', {
        templateUrl: 'views/projects.html'
    }).
    when('/repositories', {
        templateUrl: 'views/repositories.html'
    }).
    when('/suggestors', {
        templateUrl: 'views/suggestors.html'
    }).
    when('/authorities', {
        templateUrl: 'views/authorities.html'
    }).
    when('/assignments', {
        templateUrl: 'views/assignments.html',
        reloadOnSearch: false
    }).
    when('/documents', {
        templateUrl: 'views/documents.html',
        reloadOnSearch: false
    }).
    when('/myview', {
        templateUrl: 'views/myview.html'
    }).
    when('/annotate/:projectKey/:documentKey/:action', {
        templateUrl: 'views/annotate.html'
    }).
    when('/restrictedAccess', {
        templateUrl: 'views/restrictedAccess.html'
    }).
    otherwise({
        redirectTo: '/',
        templateUrl: 'views/home.html'
    });
}]);
