metadataTool.service("Metadata", function(WsApi, AbstractModel, AlertService) {

	var self;

	var Metadata = function(futureData) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		
		self.unwrap(self, futureData);
		
	};

	Metadata.data = null;
	
	Metadata.promise = null;
	
	Metadata.set = function(data) {
		self.unwrap(self, data);
	};
	
	Metadata.get = function(document) {
		Metadata.promise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'metadata', 
				method: 'get',
				data: {'name': document.name}
		});
		
		Metadata.data = new Metadata(Metadata.promise);
		
		return Metadata.data;
	};

	Metadata.unlockProject = function(project) {
		return WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'metadata', 
				method: 'unlock/' + project
		});
	};

	Metadata.export = function(project, format) {
		return WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'metadata', 
				method: format + '/' + project
		}).then(function(data) {
			AlertService.add(JSON.parse(data.body).meta, "app/export")
			console.log(JSON.parse(data.body).meta.message);
		});
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

	Metadata.getByStatus = function(status) {
		return WsApi.fetch({
			endpoint: '/private/queue', 
			controller: 'metadata', 
			method: 'status/' + status
		});
	};
	
	Metadata.ready = function() {
		return Metadata.promise;
	};
			
	return Metadata;
	
});
