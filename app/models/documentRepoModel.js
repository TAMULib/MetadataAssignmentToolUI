metadataTool.service("DocumentRepo", function(WsApi, AbstractModel) {

	var self;

	var Document = function(futureData) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		
		self.unwrap(self, futureData);
		
	};

	Document.data = null;
	
	Document.promise = null;
	
	Document.listener = WsApi.listen({
		endpoint: '/channel', 
		controller: 'documents', 
		method: '',
	});

	Document.set = function(data) {
		self.unwrap(self, data);
	};

	Document.get = function(name) {

		Document.promise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'document', 
				method: 'get',
				data: {'name': name}
		});
		
		Document.data = new Document(Document.promise);
		
		return Document.data;
	
	};
		
	Document.update = function(name, status, user, notes) {
		
		var change = {
			'name': name,
			'status': status,
			'user': user,			
			'notes': notes
		};
				
		var updateDocumentPromise = WsApi.fetch({
			endpoint: '/private/queue', 
			controller: 'document', 
			method: 'update',
			data: change
		});
				
		if(updateDocumentPromise.$$state) {
			updateDocumentPromise.then(function(data) {	
				logger.log(data);
			});
		}

		return updateDocumentPromise;
	};

	Document.save = function(document) {

		var saveDocumentPromise = WsApi.fetch({
			endpoint: '/private/queue', 
			controller: 'document', 
			method: 'save',
			data: JSON.parse(angular.toJson(document))
		});
				
		if(saveDocumentPromise.$$state) {
			saveDocumentPromise.then(function(data) {	
				logger.log(data);
			});
		}

		return saveDocumentPromise;
	};
	
	Document.push = function(name) {

		var pushDocumentPromise = WsApi.fetch({
			endpoint: '/private/queue', 
			controller: 'document', 
			method: 'push',
			data: name
		}).then(function(data){
			console.log(data);
			var document = JSON.parse(data.body).payload.Document;
			Document.data.publishedUriString = document.publishedUriString;			
			Document.data.status = document.status;
		});
				
		if(pushDocumentPromise.$$state) {
			pushDocumentPromise.then(function(data) {	
				logger.log(data);
			});
		}

		return pushDocumentPromise;
	};

	Document.listen = function() {
		return Document.listener;
	};
	
	Document.ready = function() {
		return Document.promise;
	};
	
	return Document;
	
});
