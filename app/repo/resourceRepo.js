metadataTool.repo("ResourceRepo", function ResourceRepo(Document, WsApi) {

    var resourceRepo = this;

    resourceRepo.getAllByDocumentName = function(documentName) {

      angular.extend(resourceRepo.mapping.allByDocumentName, {
          'method': 'all/' + documentName
      });

      return WsApi.fetch(resourceRepo.mapping.allByDocumentName);
    };

    return resourceRepo;

});
