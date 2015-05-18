metadataTool.service("UserRepo", function($route, WsApi, AbstractModel) {

	var self;
	
	var Users = function(futureData) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		
		self.unwrap(self, futureData, "HashMap");
		
	};
	
	Users.data = null;
	
	Users.listener = null;

	Users.promise = null;
	
	Users.set = function(data) {
		self.unwrap(self, data, "HashMap");
	};

	Users.get = function() {

		if(Users.promise) return Users.data;

		var newAllUsersPromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'user', 
				method: 'all',
		});

		Users.promise = newAllUsersPromise;

		if(Users.data) {
			newAllUsersPromise.then(function(data) {				
				Users.set(JSON.parse(data.body).content.HashMap);
			});
		}
		else {
			Users.data = new Users(newAllUsersPromise);	
		}
		
		Users.listener = WsApi.listen({
			endpoint: 'channel', 
			controller: 'users', 
			method: '',
		});
				
		Users.set(Users.listener);
		

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
		
		if(updateUserRolePromise.$$state) {
			updateUserRolePromise.then(function(data) {
				logger.log(data);
			});
		}		
	};

	Users.ready = function() {
		return Users.promise;
	};

	Users.refresh = function() {
		Users.promise = null;
		Users.get();
	};
	
	Users.listen = function() {
		return Users.listener;
	};
	
	return Users;
	
});
