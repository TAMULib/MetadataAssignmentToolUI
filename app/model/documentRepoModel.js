metadataTool.service("DocumentRepo", function(WsApi, AbstractModel) {

	var self;

	var Documents = function(futureData) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		
		self.unwrap(self, futureData, "HashMap");
		
	};

	Documents.data = null;
	
	Documents.set = function(data) {
		self.unwrap(self, data);
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

		return Documents.data;
	
	};
	
	Documents.updateAnnotator = function(filename, uin) {
		var change = {
			'filename': filename,
			'uin': uin
		};
		
		var updateUserRolePromise = WsApi.fetch({
			endpoint: '/private/queue', 
			controller: 'document', 
			method: 'update_annotator',
			data: JSON.stringify(change)
		});
		
		if(updateUserRolePromise.$$state) {
			updateUserRolePromise.then(function(data) {			
				for(var key in Documents.data.list) {
					var doc = Documents.data.list[key];				
					if(doc.filename == filename) {
						Documents.data.list[key].annotator = uin;
					}
				}
			});
		}
		
	}
		
	return Documents;
	
});
