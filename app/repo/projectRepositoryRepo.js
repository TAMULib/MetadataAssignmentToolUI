metadataTool.repo("ProjectRepositoryRepo", function ProjectRepositoryRepo(WsApi) {
    this.getTypes = function () {
        return WsApi.fetch(this.mapping.types);
    };

    return this;

});