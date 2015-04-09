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

		var addMetadataSubmitPromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'metadata', 
				method: 'add',
				data: JSON.stringify({
					'filename': document.filename,
					'label': label,
					'value': (isRepeatable) ? document.metadata[label][index] : document.metadata[label],					
					'isRepeatable': isRepeatable,
					'index': index
				})
		});

		if(addMetadataSubmitPromise.$$state) {
			addMetadataSubmitPromise.then(function(data) {
				logger.log(data);
			});
		}
		
	};
	
	Metadata.getAll = function() {

		return WsApi.fetch({
			endpoint: '/private/queue', 
			controller: 'metadata', 
			method: 'all',
		})
	
	};
			
	return Metadata;
	
});
