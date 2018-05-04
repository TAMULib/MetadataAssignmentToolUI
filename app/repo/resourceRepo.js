metadataTool.repo("ResourceRepo", function ResourceRepo($q, WsApi) {

    var resourceRepo = this;

    resourceRepo.getAllByProjectNameAndDocumentName = function(projectName, documentName) {
      angular.extend(resourceRepo.mapping.allByDocumentName, {
        'method': 'all/' + projectName + '/' + documentName
      });
      var defer = $q.defer();
      WsApi.fetch(resourceRepo.mapping.allByDocumentName).then(function(data) {
        var response = angular.fromJson(data.body);
        if(response.meta.status === 'SUCCESS') {
          defer.resolve(response.payload['ArrayList<Resource>']);
        } else {
          defer.reject();
        }
      });
      return defer.promise;
    };

    return resourceRepo;

});
