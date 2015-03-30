angular.module('mock.myLibraryWsApi', []).
    service('MyLibraryWsApi', function($q) {

        var MyLibraryWsApi = this;

        MyLibraryWsApi.fetch = function(apiReq) {
        	
        	var defer = $q.defer();
        	           
        	switch(apiReq.method) {
	        	case 'credentials': return {'content':mockUser1};
	        	case 'fines': return {'content':mockFines1};
	        	case 'items': return {'content':mockLoans1};
	        	case 'renew': defer.resolve({'content':mockLoans1}); break;
	        	case 'requests': return {'content':mockRequests1};
	        	case 'cancel': defer.resolve({'content':mockRequests1}); break;
	        	default: return {'content':{}};
        	}
        	            
            return defer.promise;
        }
            
});