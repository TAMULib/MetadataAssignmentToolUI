myLibrary.service("User", function(MyLibraryWsApi, AbstractModel) {

	var self;

	var User = function(futureData) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		
		self.unwrap(self, futureData, "Credentials");
		
	};

	User.data = null;
	
	User.set = function(data) {
		self.unwrap(self, data);
	};

	User.get = function(action) {

		if(User.data && !action) return User.data;

		var newUserPromise = MyLibraryWsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'user', 
				method: 'credentials',
		});

		if(action) {
			newUserPromise.then(function(data) {
				console.log("Inside Promise");
				User.set(JSON.parse(data.body).content.Credentials);
			});
		}
		else {
			User.data = new User(newUserPromise);	
		}

		return User.data;
	
	};
		
	return User;
	
});
