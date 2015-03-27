myLibrary.service("Document", function(MyLibraryWsApi, AbstractModel) {

	var self;

	var Document = function(futureData) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		
		self.unwrap(self, futureData, "ArrayList<DocumentImpl>");
		
	};

	Document.data = null;
	
	Document.set = function(data) {
		self.unwrap(self, data);
	};

	Document.get = function(action) {

		if(Document.data && !action) return Document.data;

		var newDocumentPromise = MyLibraryWsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'document', 
				method: 'all',
		});

		if(action) {
			newDocumentPromise.then(function(data) {
				Document.set(JSON.parse(data.body).content.Document);
			});
		}
		else {
			Document.data = new Document(newDocumentPromise);	
		}

		return Document.data;
	
	};
		
	return Document;
	
});
