metadataTool.service("UserRepo", function(WsApi, AbstractModel) {

	var self;

	var Users = function(futureData) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		
		self.unwrap(self, futureData, "HashMap");
		
	};
	
	Users.data = null;
	
	Users.set = function(data) {
		self.unwrap(self, data);
	};

	Users.get = function(action) {

		if(Users.data && !action) return Users.data;

		var newAllUsersPromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'user', 
				method: 'all',
		});

		if(action) {
			newAllUsersPromise.then(function(data) {
				Users.set(JSON.parse(data.body).content.HashMap);
			});
		}
		else {
			Users.data = new Users(newAllUsersPromise);	
		}

		return Users.data;
	
	};
	
	Users.updateRole = function(uin, role) {
		var change = {
			'uin': uin,
			'role': role
		};
		var updateUserRolePromise = WsApi.fetch({
			endpoint: '/private/queue', 
			controller: 'user', 
			method: 'update_role',
			data: JSON.stringify(change)
		});
		
		updateUserRolePromise.then(function(data) {
			console.log(data);
		});
		
	}
	
	return Users;
	
});
