metadataTool.service("User", function(WsApi, AbstractModel) {

	var self;

	var User = function(futureData) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		
		self.unwrap(self, futureData, "Credentials");
		
	};
	
	User.data = null;

	User.promise = null;
	
	User.set = function(data) {
		self.unwrap(self, data);
	};

	User.get = function(action) {

		if(User.data && !action) return User.data;

		var newUserPromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'user', 
				method: 'credentials',
		});

		if(action) {
			newUserPromise.then(function(data) {
				User.set(JSON.parse(data.body).content.Credentials);
			});
		}
		else {
			User.data = new User(newUserPromise);	
		}

		User.promise = newUserPromise;

		return User.data;
	
	};

	User.ready = function() {
		return User.promise;
	};

	return User;
	
});
