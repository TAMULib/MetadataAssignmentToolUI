var metadataTool = angular.module('metadataTool', 
		[
		 'ngRoute',
		 'ngTable',
		 'metadataTool.version'
		 ]).constant('globalConfig',globalConfig);

setUpApp(function() {
	angular.bootstrap(document, ['metadataTool']);
});
