metadataTool.service("DocumentRepo", function(WsApi, AbstractModel) {

	var self;

	var Document = function(futureData) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		
		self.unwrap(self, futureData, "HashMap");
		
	};

	Document.data = null;
	
	Document.promise = null;
	
	Document.listener = WsApi.listen({
		endpoint: 'channel', 
		controller: 'documents', 
		method: '',
	});

	Document.set = function(data) {
		self.unwrap(self, data, "HashMap");
	};

	Document.get = function(name) {

		var newDocumentPromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'document', 
				method: 'get',
				data: JSON.stringify({'name': name})
		});
		
		Document.data = new Document(newDocumentPromise);
		
		Document.promise = newDocumentPromise;
		
		return Document.data;
	
	};
		
	Document.update = function(name, user, status, notes) {
		
		var change = {
			'name': name,
			'user': (user.firstName && user.lastName && user.uin) ? user.firstName + " " + user.lastName + " " + user.uin : user,
			'status': status,
			'notes': notes
		};
				
		var updateDocumentPromise = WsApi.fetch({
			endpoint: '/private/queue', 
			controller: 'document', 
			method: 'update',
			data: JSON.stringify(change)
		});
				
		if(updateDocumentPromise.$$state) {
			updateDocumentPromise.then(function(data) {	
				logger.log(data);
			});
		}

		return updateDocumentPromise;
		
	};

	Document.listen = function() {
		return Document.listener;
	};
	
	Document.ready = function() {
		return Document.promise;
	};
	
	return Document;
	
});
