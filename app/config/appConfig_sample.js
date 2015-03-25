var globalConfig = { 
		
		// Set this to the webService if mocking AuthService and Voyager service
		
		'authService':'https://labs.library.tamu.edu/authservice-dev',
		'webService':'http://osd144.library.tamu.edu/mylibrary-dev', 
		
		'display': {
			'dashboard':true, 
			'myrecord':true, 
			'classguides':false, 
			'coursereserves':false, 
			'getitforme':false, 
			'mylibrarian':false, 
			'whatsnew':false,
			'time':true,
			'weather':true,
			'notices':false,
			'settings':false
		},
		
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
