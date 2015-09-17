function setUpApp(bootstrapApp) {

	window.stompClient = Stomp.over(new SockJS(appConfig.webService+"/connect", null, {protocols_whitelist: appConfig.sockJsConnectionType}));

	var jwt = getJWT();

	if(!appConfig.stompDebug) {
		window.stompClient.debug = null; 
	}

	if(jwt) {
		if(!sessionStorage.token) {
			sessionStorage.token = jwt;
		}

		angular.element(document).ready(function() {
			window.stompClient.connect({"jwt": sessionStorage.token}, function() {	
		  		bootstrapApp();
			});
		});

	} else {

		if(appConfig.mockRole) {
			window.open(appConfig.authService + "/token?referer="+location.href + "&mock=" + appConfig.mockRole, "_self");
		}
		else {
			window.open(appConfig.authService + "/token?referer="+location.href, "_self");
		}

	} 

	function getJWT() {

		if(sessionStorage.token) {
			return sessionStorage.token;
		}

		var queriesString = location.search;

		if(typeof(queriesString) === "undefined") {
			return null;
		}

		var queries = queriesString.substring(1).split("&");

		var jwt = null;
		
		for(var key in queries) {
			var queryString = queries[key];
			var query = queryString.split("=");
			if(query[0] == "jwt") jwt = query[1];
		}

		if(jwt) {
			var uri = location.toString();
			if (uri.indexOf("?") > 0) {
			    var clean_uri = uri.substring(0, uri.indexOf("?"));
			    history.replaceState({}, document.title, clean_uri);
			}
		}

		return jwt;
	}	

}

