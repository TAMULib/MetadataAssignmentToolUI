var mockDocument1 = {
	'HashMap':{
		'text':"This is my excellent text."
	}
};

var mockDocument2 = {
	'HashMap':{
		'text':"This is my important text."
	}
};

var mockDocument3 = {
	'HashMap':{
		'text':"This is my useless text."
	}
};


angular.module('mock.document', []).
    service('Document', function($q) {
    	
    	var self;
    	
    	var Document = function(futureData) {
    		self = this;
			
    		if(!futureData.$$state) {
    			angular.extend(self, futureData);
    			return;
    		}

    		futureData.then(null, null, function(data) {
    			angular.extend(self, data);	
    		});

    	}
    	
    	Document.get = function() {
            return new Document(mockDocument1);
        };
        
        Document.set = function(data) {
        	angular.extend(self, data);
        };
        
        Document.fetch = function() {
        	return $q(function(resolve) {            	
            	resolve(mockDocument3);
            });
        }; 
        
        return Document;
});
