metadataTool.controller('NavigationController', function ($controller, $scope, $location) {

	console.log('NavigationController started');
	
    angular.extend(this, $controller('AbstractController', {$scope: $scope}));

    $scope.$on('$routeChangeStart', function(next, current) {
	    $scope.view = $location.$$path;	    
	});
	
});
