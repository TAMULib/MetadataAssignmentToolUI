metadataTool.service("AbstractModel", function () {

	var AbstractModel = function(data) {
		angular.extend(this, data);
	};

	/*
	* All abstracted methods can go here: (e.g. AbstractModel.myMethod = funciton() {} )
	* A model can then extend this my including "self = this;" and "angular.extend(self, AbstractModel);"
	* in its contructor.
	*/ 
	
	AbstractModel.unwrap = function(self, futureData, modelString) {
		
		if(!futureData.$$state) {
			angular.extend(self, futureData);
			return;
		}

		futureData.then(
			function(data) {
				angular.extend(self, JSON.parse(data.body).content[modelString]);		
			},
			function(data) {
				console.error(data);
			},
			function(data) {
				angular.extend(self, JSON.parse(data.body).content[modelString]);		
		});
	};

	AbstractModel.add = function(self, object) {
		angular.extend(self, object);
	};
	
	return AbstractModel;

});