metadataTool.service("ControlledVocabulary", function(WsApi, AbstractModel) {

	var self;

	var ControlledVocabulary = function(futureData) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		
		self.unwrap(self, futureData);
		
	};
	
	ControlledVocabulary.data = null;

	ControlledVocabulary.promise = null;
	
	ControlledVocabulary.set = function(data) {
		self.unwrap(self, data);
	};

	ControlledVocabulary.get = function() {

		if(ControlledVocabulary.promise) return ControlledVocabulary.data;

		ControlledVocabulary.promise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'cv', 
				method: 'all'
		});

		if(ControlledVocabulary.data) {
			self.update(self, ControlledVocabulary.promise);
		}
		else {
			ControlledVocabulary.data = new ControlledVocabulary(ControlledVocabulary.promise);	
		}

		return ControlledVocabulary.data;
	
	};

	ControlledVocabulary.ready = function() {
		return ControlledVocabulary.promise;
	};

	ControlledVocabulary.refresh = function() {
		ControlledVocabulary.promise = null;
		ControlledVocabulary.get();
	};

	return ControlledVocabulary;
	
});
