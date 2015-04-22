metadataTool.controller('NavigationController', function ($controller, $scope, $location) {

    angular.extend(this, $controller('AbstractController', {$scope: $scope}));

    $scope.$on('$routeChangeStart', function(next, current) {
	    $scope.view = $location.$$path;	    
	});
	
});


