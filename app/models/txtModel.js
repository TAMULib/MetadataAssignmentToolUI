metadataTool.service("TXT", function(WsApi, AbstractModel, $http) {

	var self;

	var TXT = function(futureData) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		self.unwrap(self, futureData, "HashMap");
		
	};

	TXT.data = null;
	
	TXT.set = function(data) {
		self.unwrap(self, data);
	};

	TXT.get = function(name) {

		var newTxtPromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'document', 
				method: 'txt',
				data: JSON.stringify({'name': name})
		});

		TXT.data = new TXT(newTxtPromise);	

		newTxtPromise.then(function(data) {
			$http.get(JSON.parse(data.body).content.HashMap.uri).then(function(res) {
				TXT.set({'verbage': res.data});
			});			
		});
		
		return TXT.data;
	
	};
	
	return TXT;
	
});