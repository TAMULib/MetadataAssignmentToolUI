var mockFines1 = {
	"FlatFines": {
	    "id": null,
        "total": 65.5,
        "fineCount": 2,
        "list": [
            {
                "href": "http://127.0.0.1:7014/vxws/patron/437281/circulationActions/debt/fines/335368?patron_homedb=1@AMDB20020820112825",
                "amount": 2,
                "fineDate": 1424930400000,
                "fineId": 335368,
                "fineType": "Lost Item Processing",
                "itemTitle": "",
                "instName": "Texas A&M University General Libraries Catalog"
            },
            {
                "href": "http://127.0.0.1:7014/vxws/patron/437281/circulationActions/debt/fines/335367?patron_homedb=1@AMDB20020820112825",
                "amount": 63.5,
                "fineDate": 1424930400000,
                "fineId": 335367,
                "fineType": "Lost Equipment Processing",
                "itemTitle": "Wireless laptops ",
                "instName": "Texas A&M University General Libraries Catalog"
            }
        ]
	}
};

var mockFines2 = {
	"FlatFines": {
    	"id": null,
        "total": 18,
        "fineCount": 2,
        "list": [
             {
                "href": "http://127.0.0.1:7414/vxws/patron/344968/circulationActions/debt/fines/7631?patron_homedb=1@MSDB20020820112902",
                "amount": 15,
                "fineDate": 1424930400000,
                "fineId": 7631,
                "fineType": "Lost Item Replacement",
                "itemTitle": "Complete dog book : official publication of the American Kennel Club. ",
                "instName": "TAMU Medical Sciences Library"
            },
            {
                "href": "http://127.0.0.1:7414/vxws/patron/344968/circulationActions/debt/fines/7630?patron_homedb=1@MSDB20020820112902",
                "amount": 3,
                "fineDate": 1424930400000,
                "fineId": 7630,
                "fineType": "Overdue",
                "itemTitle": "Canine and feline dermatology : a systematic approach / Gene H. Nesbitt. ",
                "instName": "TAMU Medical Sciences Library"
            }
        ]
	}
};

var mockFines3 = {
	"FlatFines": {
		"id": null,
        "total": 95.5,
        "fineCount": 2,
        "list": [
             {
                "href": "http://127.0.0.1:7014/vxws/patron/437281/circulationActions/debt/fines/335367?patron_homedb=1@AMDB20020820112825",
                "amount": 95,
                "fineDate": 1425276000000,
                "fineId": 335367,
                "fineType": "Forgive",
                "itemTitle": "",
                "instName": "Texas A&M University General Libraries Catalog"
            },
            {
                "href": "http://127.0.0.1:7414/vxws/patron/344968/circulationActions/debt/fines/7632?patron_homedb=1@MSDB20020820112902",
                "amount": 0.5,
                "fineDate": 1424930400000,
                "fineId": 7632,
                "fineType": "Overdue",
                "itemTitle": "Excerpts from classics in allergy. ",
                "instName": "TAMU Medical Sciences Library"
            }
        ]
	}
};

angular.module('mock.fines', []).
    service('Fines', function($q) {
    	
    	var self;
    	
    	var Fines = function(futureData) {
    		self = this;

    		if(!futureData.$$state) {
    			angular.extend(self, futureData);
    			return;
    		}

    		futureData.then(null, null, function(data) {
    			angular.extend(self, data);	
    		});

    	}
    	
    	Fines.get = function() {
            return new Fines(mockFines1);
        };
        
        Fines.set = function(credentials) {
        	angular.extend(self, credentials);
        };
        
        Fines.fetch = function() {
        	return $q(function(resolve) {            	
            	resolve(mockFines3);
            });
        }; 
        
        return Fines;
});