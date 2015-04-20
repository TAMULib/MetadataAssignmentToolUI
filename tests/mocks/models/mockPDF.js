var mockPDF1 = {
	'HashMap':{
		'uri': "http://localhost:9000/mnt/projects/dissertation/dissertation_1/dissertation_1.pdf"
	}
};

var mockPDF2 = {
	'HashMap':{
		'uri': "http://localhost:9000/mnt/projects/dissertation/dissertation_2/dissertation_2.pdf"  
	}
};

var mockPDF3 = {
	'HashMap':{
		'uri': "http://localhost:9000/mnt/projects/dissertation/dissertation_3/dissertation_3.pdf"
	}
};

angular.module('mock.pdf', []).
    service('PDF', function($q) {
    	
    	var self;
    	
    	var PDF = function(futureData) {
    		self = this;
			
    		if(!futureData.$$state) {
    			angular.extend(self, futureData);
    			return;
    		}

    		futureData.then(null, null, function(data) {
    			angular.extend(self, data);	
    		});

    	}
    	
    	PDF.get = function() {
            return new PDF(mockPDF1);
        };
        
        PDF.set = function(data) {
        	angular.extend(self, data);
        };
        
        return PDF;
});