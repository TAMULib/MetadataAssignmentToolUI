var mockControlledVocabulary1 = {
   "thesis.degree.grantor":  [
		"Agricultural and Mechanical College Of Texas",
		"Texas A&M University"
	],
	"thesis.degree.name": [
		"Doctor of Philosophy",
		"Doctor of Engineering",
		"Doctor of Mathematics"
	]
};

var mockControlledVocabulary2 = {
   "thesis.degree.grantor":  [
		"Agricultural and Mechanical College Of Texas",
		"Texas A&M University"
	],
	"thesis.degree.name": [
		"Doctor of Philosophy",
		"Doctor of Engineering",
		"Doctor of Mathematics"
	]
};

var mockControlledVocabulary3 = {
    "thesis.degree.grantor":  [
		"Agricultural and Mechanical College Of Texas",
		"Texas A&M University"
	],
	"thesis.degree.name": [
		"Doctor of Philosophy",
		"Doctor of Engineering",
		"Doctor of Mathematics"
	]
};

angular.module('mock.controlledVocabulary', []).
    service('ControlledVocabulary', function($q) {
    	
    	var self;
    	
    	var ControlledVocabulary = function(futureData) {
    		self = this;
			
    		if(!futureData.$$state) {
    			angular.extend(self, futureData);
    			return;
    		}

    		futureData.then(null, null, function(data) {
    			angular.extend(self, data);	
    		});

    	}
    	
    	ControlledVocabulary.get = function() {
            return new ControlledVocabulary(mockControlledVocabulary1);
        };
        
        ControlledVocabulary.set = function(data) {
        	angular.extend(self, data);
        };
        
        ControlledVocabulary.fetch = function() {
        	return $q(function(resolve) {            	
            	resolve(mockControlledVocabulary3);
            });
        }; 

        ControlledVocabulary.ready = function() {
            return $q(function(resolve) {               
                resolve(mockControlledVocabulary3);
            });
        };
        
        return ControlledVocabulary;
});