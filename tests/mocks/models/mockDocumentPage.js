var mockDocumentPage1 = {
	'PageImpl':{
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

var mockDocumentPage2 = {
	'PageImpl':{
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

var mockDocumentPage3 = {
	'PageImpl':{
		'0':{
			file: null,
			filename: "disseration003.txt",
			status: "Open",
			annotator: "333333333"
		}
	}
};

angular.module('mock.documentPage', []).
    service('DocumentPage', function($q) {
    	
    	var self;
    	
    	var DocumentPage = function(futureData) {
    		self = this;
			
    		if(!futureData.$$state) {
    			angular.extend(self, futureData);
    			return;
    		}

    		futureData.then(null, null, function(data) {
    			angular.extend(self, data);	
    		});

    	}
    	
    	DocumentPage.get = function() {
            return new DocumentPage(mockDocumentPage1);
        };
        
        DocumentPage.set = function(data) {
        	angular.extend(self, data);
        };
        
        DocumentPage.fetch = function() {
        	return $q(function(resolve) {            	
            	resolve(mockDocumentPage3);
            });
        }; 
        
        DocumentPage.listen = function() {
        	return $q(function(resolve) {            	
            	resolve(mockDocumentPage3);
            });
        }; 
        
        return DocumentPage;
});
