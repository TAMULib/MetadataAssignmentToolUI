var dataProjectAuthorityRepo1 = [
  dataProjectAuthority1,
  dataProjectAuthority2,
  dataProjectAuthority3
];

var dataProjectAuthorityRepo2 = [
  dataProjectAuthority3,
  dataProjectAuthority2,
  dataProjectAuthority1
];

var dataProjectAuthorityRepo3 = [
  dataProjectAuthority1,
  dataProjectAuthority3,
  dataProjectAuthority2
];

angular.module('mock.projectAuthorityRepo', []).service('ProjectAuthorityRepo', function($q) {
  var repo = mockRepo('ProjectAuthorityRepo', $q, mockProjectAuthority, dataProjectAuthorityRepo1);
  var mockedTypes = {};

  repo.mockTypes = function(toMock) {
    mockedTypes = toMock;
  };

  repo.getTypes = function() {
    return payloadPromise($q.defer(), mockedTypes);
  };

  repo.uploadCsv = function (model) {
    return payloadPromise($q.defer(), {"String": ""});
  };

  return repo;
});

