metadataTool.service("Document", function(WsApi, AbstractModel) {

	var self;

	var Document = function(futureData) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		
		self.unwrap(self, futureData, "HashMap");
		
	};

	Document.data = null;
	
	Document.set = function(data) {
		self.unwrap(self, data);
	};

	Document.get = function(filename) {

		var newDocumentPromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'document', 
				method: 'get',
				data: JSON.stringify({'filename': filename})
		});

		Document.data = new Document(newDocumentPromise);	
		
		return Document.data;
	
	};
	
	return Document;
	
});
