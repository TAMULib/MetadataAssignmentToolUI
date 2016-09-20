metadataTool.repo("MetadataRepo", function MetadataRepo(Metadata, WsApi) {

	this.get = function(document) {
		angular.extend(this.mapping.instantiate, {'method': 'get/' + document.name});
		return new Metadata();
	};

	this.unlockProject = function(project) {
		angular.extend(this.mapping.unlock, {'method': 'unlock/' + project});
		return WsApi.fetch(this.mapping.unlock);
	};

	this.export = function(project, format) {
		angular.extend(this.mapping.export, {'method': format + '/' + project});
		return WsApi.fetch(this.mapping.export);
	};

	this.getHeaders = function(project) {
		angular.extend(this.mapping.headers, {'method': 'headers/' + project});
		return WsApi.fetch(this.mapping.headers);
	};

	this.getByStatus = function(status) {
		angular.extend(this.mapping.status, {'method': 'status/' + status});
		return WsApi.fetch(this.mapping.status);
	};

	return this;

});