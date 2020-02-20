var dataResourceRepo1 = [
  dataResource1,
  dataResource2,
  dataResource3
];

var dataResourceRepo2 = [
  dataResource3,
  dataResource2,
  dataResource1
];

var dataResourceRepo3 = [
  dataResource1,
  dataResource3,
  dataResource2
];

angular.module("mock.resourceRepo", []).service("ResourceRepo", function ($q) {
  var repo = mockRepo("ResourceRepo", $q, mockResource, dataResourceRepo1);

  repo.getAllByProjectNameAndDocumentName = function (projectName, documentName) {
    defer = $q.defer();
    var found = [];
    for (var i in repo.mockedList) {
      var resource = repo.mockedList[i];
      found.push(angular.extend(mockResource($q), resource));
    }
    defer.resolve(found);
    return defer.promise;
  };

  return repo;
});
