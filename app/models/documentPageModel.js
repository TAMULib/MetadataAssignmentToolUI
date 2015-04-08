metadataTool.service("DocumentPage", function(WsApi, AbstractModel) {

	var self;

	var Documents = function(futureData) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		
		self.unwrap(self, futureData, "PageImpl");
		
	};
	
	Documents.listener = WsApi.listen({
		endpoint: 'channel', 
		controller: 'documents', 
		method: '',
	});
	
	Documents.set = function(data) {
		self.unwrap(self, data, "PageImpl");
	};

	Documents.get = function(page, size, field, direction, filter) {
		
		if(!field) field = 'filename';
		if(!direction) direction = 'asc';
		if(!filter.filename) filter.filename = '';
		if(!filter.status) filter.status = '';
		if(!filter.annotator) filter.annotator = '';
		
		var newDocumentPromise = WsApi.fetch({
			endpoint: '/private/queue', 
			controller: 'document', 
			method: 'page',
			data: JSON.stringify({
				'page': page,
				'size': size,
				'field': field,
				'direction': direction,
				'filename': filter.filename,
				'status': filter.status,
				'annotator': filter.annotator
			})
		});
		
		return new Documents(newDocumentPromise);
	
	};
	
	Documents.listen = function() {
		return Documents.listener;
	};
			
	return Documents;
	
});
