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

    this.getInputTypes = function () {
        return WsApi.fetch(this.mapping.inputTypes);
    };

    this.addFieldProfile = function (projectId, fieldProfile, labels) {
        console.log("adding");
        angular.extend(this.mapping.addFieldProfile, {
            'method': projectId+'/add-field-profile',
            'data': {"fieldProfile": fieldProfile, "labels":labels}
        });
        return WsApi.fetch(this.mapping.addFieldProfile);
    };

    this.updateFieldProfile = function (projectId, fieldProfile, labels) {
        angular.extend(this.mapping.updateFieldProfile, {
            'method': projectId+'/update-field-profile',
            'data': {"fieldProfile": fieldProfile, "labels":labels}
        });
        return WsApi.fetch(this.mapping.updateFieldProfile);
    };

    this.getFieldProfileLabels = function (fieldProfileId) {
        angular.extend(this.mapping.getFieldProfileLabels, {
            'method': 'field-profile/' + fieldProfileId + '/get-labels'
        });
        return WsApi.fetch(this.mapping.getFieldProfileLabels);
    };

    return this;

});
