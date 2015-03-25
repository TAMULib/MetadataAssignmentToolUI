var myLibrary = angular.module('myLibrary', 
		[
		 'ngRoute',
		 'myLibrary.version'
		 ]).constant('globalConfig',globalConfig);

setUpApp(function() {
	angular.bootstrap(document, ['myLibrary']);
});
