metadataTool.service("Metadata", function(WsApi, AbstractModel) {

	var self;

	var Metadata = function(futureData) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		
		self.unwrap(self, futureData, "HashMap");
		
	};

	Metadata.data = null;
	
	Metadata.promise = null;
	
	Metadata.set = function(data) {
		self.unwrap(self, data);
	};
	
	Metadata.get = function(document) {
		var newMetadataPromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'metadata', 
				method: 'get',
				data: JSON.stringify({'name': document.name})
		});
		
		Metadata.data = new Metadata(newMetadataPromise);
		
		Metadata.promise = newMetadataPromise;
		
		return Metadata.data;
	};
		
	Metadata.getAll = function() {
		return WsApi.fetch({
			endpoint: '/private/queue', 
			controller: 'metadata', 
			method: 'all',
		});	
	};

	Metadata.getHeaders = function(project) {
		return WsApi.fetch({
			endpoint: '/private/queue', 
			controller: 'metadata', 
			method: 'headers/' + project
		});
	};

	Metadata.getProjects = function() {
		return WsApi.fetch({
			endpoint: '/private/queue', 
			controller: 'metadata', 
			method: 'projects'
		});
	};

	Metadata.getPublishedByProject = function(project) {
		return WsApi.fetch({
			endpoint: '/private/queue', 
			controller: 'metadata', 
			method: 'csv/' + project
		});
	};
	
	Metadata.getAllPublished = function() {
		return WsApi.fetch({
			endpoint: '/private/queue', 
			controller: 'metadata', 
			method: 'published'
		});
	};
	
	Metadata.ready = function() {
		return Metadata.promise;
	};
			
	return Metadata;
	
});
