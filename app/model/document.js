metadataTool.model("Document", function Document(WsApi) {

    return function Document() {

    	var document = this;

    	this.getSuggestions = function() {
      		angular.extend(this.getMapping().suggest, {
      			   method: this.project + '/' + this.name
      		});
          return WsApi.fetch(this.getMapping().suggest);
    	};

      this.push = function() {
          angular.extend(this.getMapping().push, {'method': 'push/' + this.project + '/'+ this.name});
          return WsApi.fetch(this.getMapping().push);
      };

    	return this;
    };

});
