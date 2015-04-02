metadataTool.service("Metadata", function(WsApi, AbstractModel) {

	var self;

	var Metadata = function(futureData) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		
		self.unwrap(self, futureData, "HashMap");
		
	};

	Metadata.data = null;
	
	Metadata.set = function(data) {
		self.unwrap(self, data);
	};

	Metadata.get = function(filename) {

		var newMetadataPromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'metadata', 
				method: 'get',
				data: JSON.stringify({'filename': filename})
		});

		Metadata.data = new Metadata(newMetadataPromise);	
		
		return Metadata.data;
	
	};
	
	Metadata.add = function(document, label, isRepeatable, index) {

		var newMetadataSubmitPromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'metadata', 
				method: 'add',
				data: JSON.stringify({
					'filename': document.filename,
					'label': label,
					'value': (isRepeatable) ? document[label][index] : document[label],					
					'isRepeatable': isRepeatable,
					'index': index
				})
		});

		newMetadataSubmitPromise.then(function(data) {
			console.log(data);
		});
		
	};
		
	return Metadata;
	
});
