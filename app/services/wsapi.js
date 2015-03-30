myLibrary.service("MyLibraryWsApi",function($q, $http, wsservice, AuthServiceApi) {

	var MyLibraryWsApi = this;

	MyLibraryWsApi.listen = function(apiReq) {
		var request = '/ws/'+apiReq.controller+'/' + apiReq.method;
		var channel = '/' + apiReq.endpoint + "/" + apiReq.controller;
		
		if(apiReq.method) {
			channel +=  "/" + apiReq.method;
		}
		return wsservice.subscribe(channel);
	};

	MyLibraryWsApi.fetch = function(apiReq) {
		var request = '/ws/'+apiReq.controller+'/' + apiReq.method;	  
		var channel = apiReq.endpoint + "/" + apiReq.controller + "/" + apiReq.method;

		var fetchPromise = wsservice.send(request, {'jwt':sessionStorage.token, 'data':apiReq.data}, {}, channel);

		fetchPromise.then(null, null, function(data) {
			if(JSON.parse(data.body).content.String == "EXPIRED_JWT") {
				if(sessionStorage.assumedUser) {
					
					AuthServiceApi.getAssumedUser(JSON.parse(sessionStorage.assumedUser)).then(function() {
						wsservice.pendingReq[JSON.parse(data.body).content.RequestId.id].resend();
					});
					
				} else {
					
					AuthServiceApi.getRefreshToken().then(function() {
						wsservice.pendingReq[JSON.parse(data.body).content.RequestId.id].resend();
					});
					
				}

			}
			
		});

		return fetchPromise;
	};
	
});
