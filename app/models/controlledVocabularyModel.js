metadataTool.service("ControlledVocabulary", function(WsApi, AbstractModel) {

	var self;

	var ControlledVocabulary = function(futureData) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		
		self.unwrap(self, futureData, "LinkedHashMap");
		
	};
	
	ControlledVocabulary.data = null;

	ControlledVocabulary.promise = null;
	
	ControlledVocabulary.set = function(data) {
		self.unwrap(self, data, "LinkedHashMap");
	};

	ControlledVocabulary.get = function() {

		if(ControlledVocabulary.promise) return ControlledVocabulary.data;

		var newControlledVocabularyPromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'cv', 
				method: 'all'
		});

		ControlledVocabulary.promise = newControlledVocabularyPromise;

		if(ControlledVocabulary.data) {
			newControlledVocabularyPromise.then(function(data) {
				ControlledVocabulary.set(JSON.parse(data.body).content.LinkedHashMap);
			});
		}
		else {
			ControlledVocabulary.data = new ControlledVocabulary(newControlledVocabularyPromise);	
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
