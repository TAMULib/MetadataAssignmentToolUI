metadataTool.service("DocumentRepo", function(WsApi, AbstractModel) {

	var self;

	var Documents = function(futureData) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		
		self.unwrap(self, futureData, "HashMap");
		
	};

	Documents.data = null;
	
	Documents.listener = WsApi.listen({
		endpoint: 'channel', 
		controller: 'documents', 
		method: '',
	});

	Documents.set = function(data) {
		self.unwrap(self, data, "HashMap");
	};

	Documents.get = function(name) {

		var newDocumentPromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'document', 
				method: 'get',
				data: JSON.stringify({'name': name})
		});

		Documents.data = new Documents(newDocumentPromise);
		
		return Documents.data;
	
	};
		
	Documents.update = function(name, uin, status, notes) {
		
		var change = {
			'name': name,
			'uin': uin,
			'status': status,
			'notes': notes
		};
				
		var updateUserRolePromise = WsApi.fetch({
			endpoint: '/private/queue', 
			controller: 'document', 
			method: 'update',
			data: JSON.stringify(change)
		});
				
		if(updateUserRolePromise.$$state) {
			updateUserRolePromise.then(function(data) {	
				logger.log(data);
			});
		}
		
	}

	Documents.listen = function() {
		return Documents.listener;
	};
		
	return Documents;
	
});
