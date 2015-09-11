metadataTool.service("Export", function(WsApi, AbstractModel) {

	var self;

	var Export = function(futureData) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		
		self.unwrap(self, futureData, "HashMap");
		
	};

	Export.data = null;
	
	Export.promise = null;
	
	Export.set = function(data) {
		self.unwrap(self, data);
	};
	
	Export.execute = function(project, format) {

		var newExportPromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'metadata', 
				method: format + '/' + project
		});
		
		Export.data = new Export(newExportPromise);
		
		Export.promise = newExportPromise;
		
		return Export.data;
	};
	
	
	Export.ready = function() {
		return Export.promise;
	};
			
	return Export;
	
});
