metadataTool.service("wsservice",function($q) { 
	
	var wsservice = this;
	
	wsservice.pendingReqCounter = 0;
	
	wsservice.pendingReq = {};
	
	wsservice.subscriptions = {};

	wsservice.client = window.stompClient;
	delete window.stompClient;

	wsservice.subscribe = function(channel, persist) {
		
		var id = "sub-"+wsservice.client.counter;
		
		var defer;

		if(!persist) persist = false;

		var subObj;

		if((subObj = wsservice.subExist(channel))) {
			defer = subObj.defer;
		} else {
			
			defer = $q.defer();
			subObj = {
				channel: channel,
				defer: defer
			};

			wsservice.client.subscribe(channel, function(data) {
				
				var requestId = JSON.parse(data.body).content.RequestId ? JSON.parse(data.body).content.RequestId.id : null;
				
				var response = JSON.parse(data.body).response;

				if(wsservice.pendingReq[requestId]) {

					/*logger.info("");
					logger.debug(channel);
					logger.info("Resolving Request " + requestId + ": " + wsservice.pendingReq[requestId].request);
					logger.log(JSON.parse(data.body));*/
					
					if(response != "refresh") {
						
						if (response != 'failure') {
							wsservice.pendingReq[requestId].defer.resolve(data);
						} else {
							wsservice.pendingReq[requestId].defer.reject(data);
						}
						
						delete wsservice.pendingReq[requestId];	
						
					} else {
						wsservice.pendingReq[requestId].defer.notify(data);
					}
					
				}
				
				defer.notify(data);

			});

			wsservice.subscriptions[id] = subObj;
		}

		return defer.promise;
	};

	wsservice.send = function(request, headers, payload, channel) {

		if(!wsservice.subExist(channel)) wsservice.subscribe(channel);

		var reqDefer = $q.defer();
		
		headers.id = wsservice.pendingReqCounter++;

		wsservice.client.send(request, headers, payload);
		
		wsservice.pendingReq[headers.id] = {
			defer: reqDefer,
			resend: function() {
				headers.jwt = sessionStorage.token;
				wsservice.client.send(request, headers, payload);
			}
		};

		return wsservice.pendingReq[headers.id].defer.promise;
		
	};

	wsservice.subExist = function(channel) {
		for(var key in wsservice.subscriptions) {
			var subObj = wsservice.subscriptions[key];
			if(subObj.channel == channel) return subObj;
		}
		return false;
	};
	
	wsservice.unsubscribe = function(sub) {
		wsservice.client.unsubscribe(sub);
		delete wsservice.subscriptions[sub];
	};

	wsservice.unsubscribeAll = function() {
		for(var key in wsservice.subscriptions){
			var sub = wsservice.subscriptions[key];
			if(!sub.persist) wsservice.unsubscribe(key);
		}
	};

});
