metadataTool.service("TXT", function(WsApi, AbstractModel, $http) {

	var self;

	var TXT = function(futureData, modelString) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		self.unwrap(self, futureData, modelString);
		
	};

	TXT.data = null;
	
	TXT.get = function(name) {

		var newTxtPromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'document', 
				method: 'txt',
				data: JSON.stringify({'name': name})
		});

		TXT.data = new TXT(newTxtPromise);
		
		if(newTxtPromise.$$state) {
			newTxtPromise.then(function(data) {
				var newVerbagePromise = $http.get(JSON.parse(data.body).content.HashMap.uri).then(function(response) {
					angular.extend(TXT.data, {'verbage':response.data});
				});

			});
		}
		
		return TXT.data;
	
	};
	
	return TXT;
	
});