metadataTool.repo("ProjectSuggestorRepo", function ProjectSuggestorRepo(WsApi) {
    this.getTypes = function () {
        return WsApi.fetch(this.mapping.types);
    };

    return this;

});