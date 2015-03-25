myLibrary.service("MyLibraryRestApi",function($http) {

	var webservice = globalConfig.webService;
	var authservice = globalConfig.authService;

	this.get = function(api) {

		var apirequest = webservice+'/rest/'+api.controller+'/' + api.method;

		console.log(apirequest);

		var jwtHeader = {
			'headers': {
				'jwt': sessionStorage.token
			}
		};

		return $http.get(apirequest, jwtHeader).
		then(
				//success callback	
				function(data) {
					return data.data;
				},
				//error callback
				function(e) {
					console.log(e);
					if(e.data.message == "expired") {
						config = {withCredentials: true};

						return $http.get(authservice+"/refresh", config).
						then(function(response) {
							sessionStorage.token = response.data.tokenAsString;
							jwtHeader = {'headers': {
								'jwt': response.data.tokenAsString
							}};

							return $http.get(apirequest, jwtHeader).
							then(function(data){
								return data.data;	
							});
						});

					} else {
						window.location.replace(authservice+"/token?referer="+window.location);
					}

				});

	};

});