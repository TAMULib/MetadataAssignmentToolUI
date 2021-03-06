metadataTool.model("Document", function Document(WsApi, ProjectRepo) {

    return function Document() {

        var doc = this;

        this.getSuggestions = function () {
            angular.extend(this.getMapping().suggest, {
                method: this.project + '/' + this.name
            });
            return WsApi.fetch(this.getMapping().suggest);
        };

        this.push = function () {
          angular.extend(this.getMapping().push, {
              'method': 'push/' + this.project + '/' + this.name
          });

          return WsApi.fetch(this.getMapping().push);
        };


        this.delete = function () {
          angular.extend(this.getMapping().remove, {
            'method': 'remove/' + this.project + '/' + this.name
          });

          return WsApi.fetch(this.getMapping().remove);
        };

        this.getProject = function () {
            return ProjectRepo.findByName(this.project);
        };

        return this;
    };

});
