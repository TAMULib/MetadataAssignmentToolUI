angular.module('mock.wsApi', []).
    service('WsApi', function($q) {

        var WsApi = this;

        WsApi.fetch = function(apiReq) {
        	
        	var defer = $q.defer();
        	
        	switch(apiReq.method) {
	        	case 'credentials': return {'content':mockUser1};
	        	case 'all': {
	        		if(apiReq.controller == 'user') {
	        			return {'content':mockUserRepo1};
	        		}
	        		else if(apiReq.controller == 'document') {
	        			return {'content':mockDocument1};
        			}
	        		else {
	        			return {'content':{}};
	        		}
	        	}
	        	case 'update_role': {	        		
	        		mockUserRepo1['HashMap'][2].role = JSON.parse(apiReq['data']).role;
	        		return mockUserRepo1;
	        	}
	        	default: return {'content':{}};
        	}
        	            
            return defer.promise;
        }
            
});