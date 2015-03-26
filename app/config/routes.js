myLibrary.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider.
		when('/myview', {
			templateUrl: 'view/myview.html'
		}).
		when('/admin', {
			templateUrl: 'view/admin.html'
		}).
		otherwise({redirectTo: '/',
			templateUrl: 'view/index.html'
		});
}]);