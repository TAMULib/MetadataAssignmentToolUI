metadataTool.service("AssumedUser", function(AbstractModel, $q) {

	var self;

	var AssumedUser = function(data) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		
		self.unwrap(self, data);
		
	};
	
	AssumedUser.data = null;

	AssumedUser.promise = null;
	
	AssumedUser.set = function(data) {
		self.unwrap(self, data);

		AssumedUser.promise.resolve();
	};

	AssumedUser.get = function() {

		var newAssumedUserPromise = $q.defer();

		AssumedUser.data = new AssumedUser(newAssumedUserPromise);	
		
		AssumedUser.promise = newAssumedUserPromise;

		return AssumedUser.data;
	
	};

	AssumedUser.ready = function() {
		return AssumedUser.promise;
	};

	return AssumedUser;
	
});
