function setUpApp(bootstrapApp) {

	window.stompClient = Stomp.over(new SockJS(globalConfig.webService+"/connect"));
	
	var jwt = getJWT();

	if(!globalConfig.stompDebug) {
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

		if(globalConfig.mockRole) {
			window.open(globalConfig.authService + "/token?referer="+location.href + "&mock=" + globalConfig.mockRole, "_self");
		}
		else {
			window.open(globalConfig.authService + "/token?referer="+location.href, "_self");
		}

	} 

	function getJWT() {

		if(sessionStorage.token) {
			return sessionStorage.token;
		}

		var queriesString = location.search;

		if(typeof(queriesString) == "undefined") {
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

