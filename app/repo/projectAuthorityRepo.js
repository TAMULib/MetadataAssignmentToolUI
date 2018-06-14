metadataTool.repo("ProjectAuthorityRepo", function ProjectAuthorityRepo(WsApi) {
    this.getTypes = function () {
        return WsApi.fetch(this.mapping.types);
    };

    return this;

});