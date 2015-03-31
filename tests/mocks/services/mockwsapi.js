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
	        			return {'content':mockDocumentRepo1};
        			}
	        		else {
	        			return {'content':{}};
	        		}
	        	}
	        	case 'update_role': {	        		
	        		mockUserRepo1['HashMap'][2].role = JSON.parse(apiReq['data']).role;
	        		return mockUserRepo1;
	        	}
	        	case 'update_annotator': {	        		
	        		mockDocumentRepo1['HashMap'].annatator = JSON.parse(apiReq['data']).annotator;
	        		return mockDocumentRepo1;
	        	}
	        	default: return {'content':{}};
        	}
        	            
            return defer.promise;
        }
            
});