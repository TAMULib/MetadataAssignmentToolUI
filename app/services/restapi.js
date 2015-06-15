metadataTool.service("RestApi",function($http, $window, AuthServiceApi) {

	var webservice = globalConfig.webService;
	var authservice = globalConfig.authService;

	this.get = function(uri) {
		return $http.get(uri, {headers:{'jwt':sessionStorage.token}}).then(
			//success callback	
			function(response) {
				return response.data;
			},
			//error callback
			function(response) {
				if(response.data.message == "expired") {
					
					if(sessionStorage.assumedUser) {
					
						return AuthServiceApi.getAssumedUser(JSON.parse(sessionStorage.assumedUser)).then(function() {
							return $http.get(uri, {headers:{'jwt':sessionStorage.token}}).then(function(response) {
								return response.data;	
							});
						});
						
					} else {
						
						return AuthServiceApi.getRefreshToken().then(function() {
							return $http.get(uri, {headers:{'jwt':sessionStorage.token}}).then(function(response) {
								return response.data;	
							});
						});
						
					}

				} else {
					$window.location.replace(authservice + "/token?referer=" + window.location);
				}
			});
	};

});