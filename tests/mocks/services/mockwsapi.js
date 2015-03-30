angular.module('mock.wsApi', []).
    service('WsApi', function($q) {

        var WsApi = this;

        WsApi.fetch = function(apiReq) {
        	
        	var defer = $q.defer();
        	           
        	switch(apiReq.method) {
	        	case 'credentials': return {'content':mockUser1};
	        	case 'all': return {'content':mockDocument1};
	        	default: return {'content':{}};
        	}
        	            
            return defer.promise;
        }
            
});