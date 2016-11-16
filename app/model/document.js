metadataTool.model("Document", function Document(WsApi) {

    return function Document() {

        // additional model methods and variables

    	var document = this;

    	this.getSuggestions = function() {
    		angular.extend(this.getMapping().suggest, {
    			method: this.name
    		});
    		var promise = WsApi.fetch(this.getMapping().suggest);
    		promise.then(function(response) {
    			angular.extend(document, {
    				suggestions: angular.fromJson(response.body).payload["ArrayList<Suggestion>"]
    			});
    		});
    		return promise;
    	};

    	return this;
    };

});