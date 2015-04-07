metadataTool.service("DocumentRepo", function(WsApi, AbstractModel) {

	var self;

	var Documents = function(futureData) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		
		self.unwrap(self, futureData, "HashMap");
		
	};

	Documents.data = null;
	
	Documents.listener = null;

	Documents.set = function(data) {
		self.unwrap(self, data, "HashMap");
	};

	Documents.get = function(action) {

		if(Documents.data && !action) return Documents.data;

		var newDocumentPromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'document', 
				method: 'all',
		});

		if(action) {
			newDocumentPromise.then(function(data) {
				Documents.set(JSON.parse(data.body).content.Document);
			});
		}
		else {
			Documents.data = new Documents(newDocumentPromise);	
		}
		
		Documents.listener = WsApi.listen({
			endpoint: 'channel', 
			controller: 'documents', 
			method: '',
		});
		
		return Documents.data;
	
	};
	
	Documents.update = function(filename, uin, status) {
		var change = {
			'filename': filename,
			'uin': uin,
			'status': status
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
