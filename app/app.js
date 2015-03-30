var metadataTool = angular.module('metadataTool', 
		[
		 'ngRoute',
		 'myLibrary.version'
		 ]).constant('globalConfig',globalConfig);

setUpApp(function() {
	angular.bootstrap(document, ['metadataTool']);
});
