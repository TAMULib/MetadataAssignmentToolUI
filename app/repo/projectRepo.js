metadataTool.repo("ProjectRepo", function ProjectRepo(WsApi) {

	this.batchPublishDocuments = function(projectId,repositoryId) {
        angular.extend(this.mapping.batchpublish, {'method': 'batchpublish/project/' + projectId + '/repository/'+ repositoryId});
        return WsApi.fetch(this.mapping.batchpublish);
	};

    return this;

});
