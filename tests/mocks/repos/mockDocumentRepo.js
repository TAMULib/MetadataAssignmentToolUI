var mockDocumentRepo1 = {
	'HashMap':{
		'0':{
			file: null,
			filename: "disseration001.txt",
			status: "Open",
			annotator: "111111111"
		},
		'1':{
			file: null,
			filename: "disseration002.txt",
			status: "Open",
			annotator: "222222222"
		},
		'2':{
			file: null,
			filename: "disseration003.txt",
			status: "Open",
			annotator: "333333333"
		}
	}
};

var mockDocumentRepo2 = {
	'HashMap':{
		'0':{
			file: null,
			filename: "disseration002.txt",
			status: "Open",
			annotator: "222222222"
		},
		'1':{
			file: null,
			filename: "disseration003.txt",
			status: "Open",
			annotator: "333333333"
		},
		'2':{
			file: null,
			filename: "disseration004.txt",
			status: "Open",
			annotator: "444444444"
		}
	}
};

var mockDocumentRepo3 = {
	'HashMap':{
		'0':{
			file: null,
			filename: "disseration003.txt",
			status: "Open",
			annotator: "333333333"
		}
	}
};

angular.module('mock.documentRepo', []).
    service('DocumentRepo', function($q) {
    	
    	var self;
    	
    	var DocumentRepo = function(futureData) {
    		self = this;
			
    		if(!futureData.$$state) {
    			angular.extend(self, futureData);
    			return;
    		}

    		futureData.then(null, null, function(data) {
    			angular.extend(self, data);	
    		});

    	}
    	
    	DocumentRepo.get = function() {
            return new DocumentRepo(mockDocumentRepo1);
        };
        
        DocumentRepo.set = function(data) {
        	angular.extend(self, data);
        };
        
        DocumentRepo.fetch = function() {
        	return $q(function(resolve) {            	
            	resolve(mockDocumentRepo3);
            });
        }; 
        
        DocumentRepo.listen = function() {
        	return $q(function(resolve) {            	
            	resolve(mockDocumentRepo3);
            });
        }; 
        
        DocumentRepo.ready = function() {
        	return $q(function(resolve) {            	
            	resolve(mockDocumentRepo3);
            });
    	};
        
        return DocumentRepo;
});
