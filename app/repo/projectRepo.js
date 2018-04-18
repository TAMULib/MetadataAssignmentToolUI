metadataTool.repo("ProjectRepo", function ProjectRepo(WsApi) {

    this.batchPublishDocuments = function (projectId, repositoryId) {
        angular.extend(this.mapping.batchpublish, {
            'method': 'batchpublish/project/' + projectId + '/repository/' + repositoryId
        });
        return WsApi.fetch(this.mapping.batchpublish);
    };

    this.findByName = function (projectName) {
        return this.getAll().filter(function (project) {
            return project.name === projectName;
        })[0];
    };

    this.getIngestTypes = function () {
        return WsApi.fetch(this.mapping.ingestTypes);
    };

    return this;

});
