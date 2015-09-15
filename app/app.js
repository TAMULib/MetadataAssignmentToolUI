var metadataTool = angular.module('metadataTool', 
		[
		 'ngRoute',
		 'ngTable',
		 'ngSanitize',
		 'ngCsv',
		 'metadataTool.version'
		 ]).constant('appConfig', appConfig);

setUpApp(function() {
	angular.bootstrap(document, ['metadataTool', 'core', 'ui.bootstrap']);
});
