var appConfig = { 

		'base': 'metadatatool',
		
		'version': 'metadataTool',

		// Set this to the webService if mocking AuthService
		
		'authService': 'https://labs.library.tamu.edu/authservice',
		'webService': '', 
		
		'storageType': 'session',

		'logging': {
			'log': true,
			'info': true,
			'warn': true,
			'error': true,
			'debug': true
		},
		
		'stompDebug': false,
		
		// Set this to 'admin' or 'user' if using mock AuthService
		// otherwise set to null or false
		
		'mockRole': null
};
