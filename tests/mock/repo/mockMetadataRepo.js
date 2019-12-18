var dataMetadataRepo1 = [
  dataMetadata1,
  dataMetadata2,
  dataMetadata3
];

var dataMetadataRepo2 = [
  dataMetadata3,
  dataMetadata2,
  dataMetadata1
];

var dataMetadataRepo3 = [
  dataMetadata1,
  dataMetadata3,
  dataMetadata2
];

// Note: MetadataRepo actually represents the repo for MetadataFieldGroup.
angular.module("mock.metadataRepo", []).service("MetadataRepo", function ($q) {
  var repo = mockRepo("MetadataRepo", $q, mockMetadata, dataMetadataRepo1);

  repo.export = function (project, format) {
    return payloadPromise($q.defer(), {});
  };

  repo.get = function (document) {
    return angular.copy(mockMetadata);
  };

  repo.getByStatus = function (status) {
    // TODO
    return payloadPromise($q.defer(), angular.copy(mockMetadata));
  };

  repo.getHeaders = function (format, project) {
    var response = {"ArrayList<String>": ["header1", "header2", "header3"]};
    return payloadPromise($q.defer(), response);
  };

  repo.unlockProject = function (project) {
    return payloadPromise($q.defer(), true);
  };

  return repo;
});
