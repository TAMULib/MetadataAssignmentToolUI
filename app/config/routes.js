metadataTool.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider.
		when('/users', {
			templateUrl: 'view/users.html'
		}).
		when('/assignments', {
			templateUrl: 'view/assignments.html'
		}).
		when('/documents', {
			templateUrl: 'view/documents.html'
		}).
		when('/myview', {
			templateUrl: 'view/myview.html'
		}).
		when('/admin', {
			templateUrl: 'view/admin.html'
		}).
		otherwise({redirectTo: '/',
			templateUrl: 'view/home.html'
		});
}]);