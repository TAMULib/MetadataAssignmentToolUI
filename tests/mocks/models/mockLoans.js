var mockLoans1 = {
    "FlatLoans": {
        "id": null,
        "loanCount": 4,
        "list": [
            {
                "canRenew": "N",
                "href": "http://127.0.0.1:7014/vxws/patron/437281/circulationActions/loans/1@AMDB20020820112825|4159197?patron_homedb=1@AMDB20020820112825",
                "loanDueDate": 1420207200000,
                "itemId": 4159197,
                "itemType": "4 hours <T>",
                "title": "Alkaline hydrothermal vent hypothesis of the origin of life on earth.",
                "statusText": "Charged",
                "instName": "Texas A&M University General Libraries"
            },
            {
                "canRenew": "N",
                "href": "http://127.0.0.1:7014/vxws/patron/437281/circulationActions/loans/1@AMDB20020820112825|3424014?patron_homedb=1@AMDB20020820112825",
                "loanDueDate": 1451883600000,
                "itemId": 3424014,
                "itemType": "normal",
                "title": "Academ's fury / Jim Butcher.",
                "statusText": "Renewed",
                "instName": "Texas A&M University General Libraries"
            },
            {
                "canRenew": "Y",
                "href": "http://127.0.0.1:7014/vxws/patron/437281/circulationActions/loans/1@AMDB20020820112825|1087369?patron_homedb=1@AMDB20020820112825",
                "loanDueDate": 1451876400000,
                "itemId": 1087369,
                "itemType": "normal",
                "title": "Bull from the sea.",
                "statusText": "Renewed",
                "instName": "Texas A&M University General Libraries"
            },
            {
                "canRenew": "Y",
                "href": "http://127.0.0.1:7014/vxws/patron/437281/circulationActions/loans/1@AMDB20020820112825|1087371?patron_homedb=1@AMDB20020820112825",
                "loanDueDate": 1451876400000,
                "itemId": 1087371,
                "itemType": "normal",
                "title": "Fire from heaven.",
                "statusText": "Renewed",
                "instName": "Texas A&M University General Libraries"
            }
        ]
    }
};

var mockLoans2 = {
	"FlatLoans": {
		"id": null,
		"loanCount": 3,
		"list": [
			{
			    "canRenew": "Y",
			    "href": "http://127.0.0.1:7014/vxws/patron/437281/circulationActions/loans/1@AMDB20020820112825|529683?patron_homedb=1@AMDB20020820112825",
			    "loanDueDate": 1451876400000,
			    "itemId": 529683,
			    "itemType": "normal",
			    "title": "Greek way.",
			    "statusText": "Renewed",
			    "instName": "Texas A&M University General Libraries"
			},
			{
			    "canRenew": "Y",
			    "href": "http://127.0.0.1:7014/vxws/patron/437281/circulationActions/loans/1@AMDB20020820112825|591832?patron_homedb=1@AMDB20020820112825",
			    "loanDueDate": 1451876400000,
			    "itemId": 591832,
			    "itemType": "normal",
			    "title": "Sweet danger.",
			    "statusText": "Renewed",
			    "instName": "Texas A&M University General Libraries"
			},
			{
			    "canRenew": "Y",
			    "href": "http://127.0.0.1:7014/vxws/patron/437281/circulationActions/loans/1@AMDB20020820112825|1078416?patron_homedb=1@AMDB20020820112825",
			    "loanDueDate": 1451876400000,
			    "itemId": 1078416,
			    "itemType": "normal",
			    "title": "Clouds of witness.",
			    "statusText": "Renewed",
			    "instName": "Texas A&M University General Libraries"
			}
		]
	}
};

var mockLoans3 = {
	"FlatLoans": {
		"id": null,
		"loanCount": 3,
		"list": [
			{
			    "canRenew": "Y",
			    "href": "http://127.0.0.1:7014/vxws/patron/437281/circulationActions/loans/1@AMDB20020820112825|762034?patron_homedb=1@AMDB20020820112825",
			    "loanDueDate": 1451876400000,
			    "itemId": 762034,
			    "itemType": "normal",
			    "title": "Strong poison / [by] Dorothy L. Sayers.",
			    "statusText": "Renewed",
			    "instName": "Texas A&M University General Libraries"
			},
			{
			    "canRenew": "Y",
			    "href": "http://127.0.0.1:7014/vxws/patron/437281/circulationActions/loans/1@AMDB20020820112825|35392?patron_homedb=1@AMDB20020820112825",
			    "loanDueDate": 1451876400000,
			    "itemId": 35392,
			    "itemType": "normal",
			    "title": "Pigs have wings.",
			    "statusText": "Renewed",
			    "instName": "Texas A&M University General Libraries"
			},
			{
			    "canRenew": "Y",
			    "href": "http://127.0.0.1:7014/vxws/patron/437281/circulationActions/loans/1@AMDB20020820112825|1078490?patron_homedb=1@AMDB20020820112825",
			    "loanDueDate": 1451876400000,
			    "itemId": 1078490,
			    "itemType": "normal",
			    "title": "Till we have faces : a myth retold / C.S. Lewis.",
			    "statusText": "Renewed",
			    "instName": "Texas A&M University General Libraries"
			}
		]
	}
};

angular.module('mock.loans', []).
    service('Loans', function($q) {
    	
    	var self;
    	
    	var Loans = function(futureData) {
    		self = this;

    		if(!futureData.$$state) {
    			angular.extend(self, futureData);
    			return;
    		}

    		futureData.then(null, null, function(data) {
    			angular.extend(self, data);	
    		});

    	}
    	
    	Loans.get = function() {
            return new Loans(mockLoans1);
        };
        
        Loans.set = function(credentials) {
        	angular.extend(self, credentials);
        };
        
        Loans.fetch = function() {
        	return $q(function(resolve) {            	
            	resolve(mockLoans3);
            });
        };
        
        Loans.renew = function(itemId) {
        	
    		var loanId;
    		
        	for(key in self.FlatLoans.list) {
    			var loan = self.FlatLoans.list[key];
    			if(loan.itemId == itemId) {
    				loanId = loan.itemId;
    				
    				if(loan.canRenew == 'Y') {
    					self.FlatLoans.list[key].loanDueDate = self.FlatLoans.list[key].loanDueDate + 2630000000;
    				}
    				
    				break;
    			}
    		}
        }
        
        Loans.renewAll = function() {
        	for(key in self.list) {
    			var loan = self.list[key];
    			self.renew(loan.itemId);
    		}
        }
        
        return Loans;
});