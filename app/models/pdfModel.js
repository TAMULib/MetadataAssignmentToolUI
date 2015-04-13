metadataTool.service("PDF", function(WsApi, AbstractModel) {

	var self;

	var PDF = function(futureData) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		console.log(futureData);
		self.unwrap(self, futureData, "HashMap");
		
	};

	PDF.data = null;
	
	PDF.set = function(data) {
		self.unwrap(self, data);
	};

	PDF.get = function(name) {

		var newPDFPromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'document', 
				method: 'pdf',
				data: JSON.stringify({'name': name})
		});

		PDF.data = new PDF(newPDFPromise);	
		
		return PDF.data;
	
	};
	
	return PDF;
	
});