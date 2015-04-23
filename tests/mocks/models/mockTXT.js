var mockTXT1 = {
	'HashMap':{
		'uri': "http://localhost:9000/mnt/projects/dissertation/dissertation_1/dissertation_1.txt",
		'verbage': 'This is a dissertation.'
	}
};

var mockTXT2 = {
	'HashMap':{
		'uri': "http://localhost:9000/mnt/projects/dissertation/dissertation_2/dissertation_2.txt",
		'verbage': 'This is a dissertation.'
	}
};

var mockTXT2 = {
	'HashMap':{
		'uri': "http://localhost:9000/mnt/projects/dissertation/dissertation_2/dissertation_2.txt",
		'verbage': 'This is a dissertation.'
	}
};

angular.module('mock.txt', []).
    service('TXT', function($q) {
    	
    	var self;
    	
    	var TXT = function(futureData) {
    		self = this;
			
    		if(!futureData.$$state) {
    			angular.extend(self, futureData);
    			return;
    		}

    		futureData.then(null, null, function(data) {
    			angular.extend(self, data);	
    		});

    	}
    	
    	TXT.get = function() {
            return new TXT(mockTXT1);
        };
        
        TXT.set = function(data) {
        	angular.extend(self, data);
        };
        
        return TXT;
});