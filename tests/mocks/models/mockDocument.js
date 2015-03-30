var mockDocument1 = {
		file: null,
		filename: "disseration001.txt",
		status: "Unassigned"
};

var mockDocument2 = {
		file: null,
		filename: "disseration002.txt",
		status: "Unassigned"
};

var mockDocument3 = {
		file: null,
		filename: "disseration003.txt",
		status: "Unassigned"
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
