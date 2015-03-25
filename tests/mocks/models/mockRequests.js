var mockRequests1 = {
    "FlatHolds": {
        "id": "",
        "holdCount": 4,
        "list": [
            {
                "href": "http://127.0.0.1:7014/vxws/patron/437281/circulationActions/requests/holds/AMDB20020820112825|384205?patron_homedb=1@AMDB20020820112825",
                "expiredDate": 1441083600000,
                "holdRecallId": 384205,
                "itemId": 2443739,
                "queuePosition": 1,
                "statusText": "Position 1: Expires 2015-09-01",
                "holdType": "H",
                "itemTitle": "Game of kings / Dorothy Dunnett.",
                "pickupLocation": "West Campus Library Circulation Desk"
            },
            {
                "href": "http://127.0.0.1:7014/vxws/patron/437281/circulationActions/requests/holds/AMDB20020820112825|384206?patron_homedb=1@AMDB20020820112825",
                "expiredDate": 1441083600000,
                "holdRecallId": 384206,
                "itemId": 3588300,
                "queuePosition": 1,
                "statusText": "Position 1: Expires 2015-09-01",
                "holdType": "H",
                "itemTitle": "Anansi boys [sound recording] / Neil Gaiman.",
                "pickupLocation": "PSEL Circulation Desk"
            }
        ]
    }
};

var mockRequests2 = {
    "FlatHolds": {
        "id": "",
        "holdCount": 4,
        "list": [            
            {
                "href": "http://127.0.0.1:7014/vxws/patron/437281/circulationActions/requests/holds/AMDB20020820112825|384207?patron_homedb=1@AMDB20020820112825",
                "expiredDate": 1433307600000,
                "holdRecallId": 384207,
                "itemId": 3356015,
                "queuePosition": 1,
                "statusText": "Position 1: Expires 2015-06-03",
                "holdType": "R",
                "itemTitle": "Sandman : a game of you / written by Neil Gailman ; illustrated by Shawn McManus, Colleen Doran, Bryan Talbot, George Pratt, Stan Woch, and Dick Giordano ; lettered by Todd Klein ; colored by Danny Vozzo ; covers by Dave McKean ; introduced by Samuel R. D",
                "pickupLocation": "Ask Us Desk (Evans Library, 1st floor)"
            },
            {
                "href": "http://127.0.0.1:7014/vxws/patron/437281/circulationActions/requests/holds/AMDB20020820112825|384208?patron_homedb=1@AMDB20020820112825",
                "expiredDate": 1441083600000,
                "holdRecallId": 384208,
                "itemId": 4184584,
                "queuePosition": 1,
                "statusText": "Position 1: Expires 2015-09-01",
                "holdType": "H",
                "itemTitle": "Smoke and mirrors : short fictions and illusions / Neil Gaiman.",
                "pickupLocation": "West Campus Library Circulation Desk"
            }
        ]
    }
};

var mockRequests3 = {
    "FlatHolds": {
        "id": "",
        "holdCount": 4,
        "list": [
            {
                "href": "http://127.0.0.1:7014/vxws/patron/437281/circulationActions/requests/holds/AMDB20020820112825|384205?patron_homedb=1@AMDB20020820112825",
                "expiredDate": 1441083600000,
                "holdRecallId": 384205,
                "itemId": 2443739,
                "queuePosition": 1,
                "statusText": "Position 1: Expires 2015-09-01",
                "holdType": "H",
                "itemTitle": "Game of kings / Dorothy Dunnett.",
                "pickupLocation": "West Campus Library Circulation Desk"
            },
            {
                "href": "http://127.0.0.1:7014/vxws/patron/437281/circulationActions/requests/holds/AMDB20020820112825|384206?patron_homedb=1@AMDB20020820112825",
                "expiredDate": 1441083600000,
                "holdRecallId": 384206,
                "itemId": 3588300,
                "queuePosition": 1,
                "statusText": "Position 1: Expires 2015-09-01",
                "holdType": "H",
                "itemTitle": "Anansi boys [sound recording] / Neil Gaiman.",
                "pickupLocation": "PSEL Circulation Desk"
            },
            {
                "href": "http://127.0.0.1:7014/vxws/patron/437281/circulationActions/requests/holds/AMDB20020820112825|384207?patron_homedb=1@AMDB20020820112825",
                "expiredDate": 1433307600000,
                "holdRecallId": 384207,
                "itemId": 3356015,
                "queuePosition": 1,
                "statusText": "Position 1: Expires 2015-06-03",
                "holdType": "R",
                "itemTitle": "Sandman : a game of you / written by Neil Gailman ; illustrated by Shawn McManus, Colleen Doran, Bryan Talbot, George Pratt, Stan Woch, and Dick Giordano ; lettered by Todd Klein ; colored by Danny Vozzo ; covers by Dave McKean ; introduced by Samuel R. D",
                "pickupLocation": "Ask Us Desk (Evans Library, 1st floor)"
            },
            {
                "href": "http://127.0.0.1:7014/vxws/patron/437281/circulationActions/requests/holds/AMDB20020820112825|384208?patron_homedb=1@AMDB20020820112825",
                "expiredDate": 1441083600000,
                "holdRecallId": 384208,
                "itemId": 4184584,
                "queuePosition": 1,
                "statusText": "Position 1: Expires 2015-09-01",
                "holdType": "H",
                "itemTitle": "Smoke and mirrors : short fictions and illusions / Neil Gaiman.",
                "pickupLocation": "West Campus Library Circulation Desk"
            }
        ]
    }
};

angular.module('mock.requests', []).
    service('Requests', function($q) {
    	
    	var self;
    	
    	var Requests = function(futureData) {
    		self = this;

    		if(!futureData.$$state) {
    			angular.extend(self, futureData);
    			return;
    		}

    		futureData.then(null, null, function(data) {
    			angular.extend(self, data);	
    		});

    	}
    	
    	Requests.get = function() {
            return new Requests(mockRequests1);
        };
        
        Requests.set = function(credentials) {
        	angular.extend(self, credentials);
        };
        
        Requests.fetch = function() {
        	return $q(function(resolve) {            	
            	resolve(mockRequests3);
            });
        };
        
        Requests.cancelById = function(itemId) {
        	
    		var requestId;
    		
        	for(key in self.FlatHolds.list) {
    			var request = self.FlatHolds.list[key];
    			if(request.itemId == itemId) {
    				requestId = request.itemId;
    				
    				delete self.FlatHolds.list[key];    				
    				
    				break;
    			}
    		}
        }
        
        Requests.cancelAll = function() {
        	for(key in self.list) {
    			var request = self.list[key];
    			self.cancel(request.itemId);
    		}
        }
        
        return Requests;
});