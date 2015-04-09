var mockMetadata1 = {
	'HashMap':{
		'abstract':"This is my excellent abstract.",
		'committee': {
			'1':'Jack Daniels',
			'2':'Jill Daniels'
		}
	}
};

var mockMetadata2 = {
	'HashMap':{
		'abstract':"This is my important abstract.",
		'committee': {
			'1':'Bob Boring',
			'2':'Jill Daniels'
		}
	}
};

var mockMetadata3 = {
	'HashMap':{
		'abstract':"This is my classified abstract.",
		'committee': {
			'1':'George Bush',
			'2':'Jeb Bush'
		}
	}
};


angular.module('mock.metadata', []).
    service('Metadata', function($q) {
    	
    	var self;
    	
    	var Metadata = function(futureData) {
    		self = this;
			
    		if(!futureData.$$state) {
    			angular.extend(self, futureData);
    			return;
    		}

    		futureData.then(null, null, function(data) {
    			angular.extend(self, data);	
    		});

    	}
    	
    	Metadata.get = function() {
            return new Metadata(mockMetadata1);
        };
        
        Metadata.set = function(data) {
        	angular.extend(self, data);
        };
        
        Metadata.fetch = function() {
        	return $q(function(resolve) {            	
            	resolve(mockMetadata3);
            });
        }; 
        
        return Metadata;
});
