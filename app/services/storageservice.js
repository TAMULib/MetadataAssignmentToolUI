metadataTool.service("StorageService",function($q, AbstractModel) { 
	
	var StorageService = this;

	var Data = function(futureData) {
		self = this;
		angular.extend(self, AbstractModel);
		self.unwrap(self, futureData);
	};
	
	StorageService.storage = {
		'session': window['sessionStorage'],
		'local': window['localStorage']
	} 

	StorageService.keys = {
		'session': {},
		'local': {}
	}

	StorageService.set = function(key, value, type) {
		StorageService.storage[type][key] = value;
		if(!StorageService.keys[type][key]) {
			StorageService.keys[type][key] = $q.defer();
		}
		StorageService.keys[type][key].notify(StorageService.storage[type][key]);
	}

	StorageService.get = function(key, type) {
		if(!StorageService.keys[type][key]) {
			StorageService.keys[type][key] = $q.defer();
		}
		var data = new Data(StorageService.keys[type][key].promise);
		if(StorageService.storage[type][key]) {
			StorageService.set(key, StorageService.storage[type][key], type);
		}
		return data;
	}

	StorageService.delete = function(key, type) {
		StorageService.keys[key][type].notify(null);
		delete StorageService.keys[key][type];
		delete StorageService.storage[key][type];
	}

	for(var type in {'session':'', 'local':''}) {
		for(var key in StorageService.storage[type]) {
			StorageService.keys[type][key] = $q.defer();
			StorageService.keys[type][key].notify(StorageService.storage[type][key]);
			StorageService.set(key, StorageService.storage[type][key], type);
		}
	}

});
