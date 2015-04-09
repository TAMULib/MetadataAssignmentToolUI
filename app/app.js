var metadataTool = angular.module('metadataTool', 
		[
		 'ngRoute',
		 'ngTable',
		 'ngSanitize',
		 'ngCsv',
		 'metadataTool.version'
		 ]).constant('globalConfig',globalConfig);

setUpApp(function() {
	angular.bootstrap(document, ['metadataTool']);
});
