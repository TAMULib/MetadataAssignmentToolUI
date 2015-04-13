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

	Metadata.get = function(name) {
		var newMetadataPromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'metadata', 
				method: 'get',
				data: JSON.stringify({'name': name})
		});

		Metadata.data = new Metadata(newMetadataPromise);
		
		Metadata.set({'committee': ['']});
		Metadata.set({'chair': ['']});

		return Metadata.data;
	};
	
	Metadata.add = function(document, label, isRepeatable, index, status) {
		var addMetadataSubmitPromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'metadata', 
				method: 'add',
				data: JSON.stringify({
					'name': document.name,
					'label': label,
					'value': (isRepeatable) ? document.metadata[label][index] : document.metadata[label],					
					'isRepeatable': isRepeatable,
					'index': index,
					'status': status
				})
		});
		if(addMetadataSubmitPromise.$$state) {
			addMetadataSubmitPromise.then(function(data) {
				logger.log(data);
			});
		}		
	};
	
	Metadata.publish = function(document) {
		var addMetadataSubmitPromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'metadata', 
				method: 'publish',
				data: JSON.stringify({
					'filename': document.filename
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
	
	Metadata.clear = function(filename) {
		return WsApi.fetch({
			endpoint: '/private/queue', 
			controller: 'metadata', 
			method: 'clear',
			data: JSON.stringify({'filename': filename})
		});		
	};
	
	Metadata.getAllPublished = function() {
		return WsApi.fetch({
			endpoint: '/private/queue', 
			controller: 'metadata', 
			method: 'published'
		});
	};
			
	return Metadata;
	
});
