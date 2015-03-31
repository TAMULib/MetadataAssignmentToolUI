var metadataTool = angular.module('metadataTool', 
		[
		 'ngRoute',
		 'metadataTool.version'
		 ]).constant('globalConfig',globalConfig);

setUpApp(function() {
	angular.bootstrap(document, ['metadataTool']);
});
