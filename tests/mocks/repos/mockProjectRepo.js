var dataProjectRepo1 = [
  dataProject1,
  dataProject2,
  dataProject3
];

var dataProjectRepo2 = [
  dataProject3,
  dataProject2,
  dataProject1
];

var dataProjectRepo3 = [
  dataProject1,
  dataProject3,
  dataProject2
];

angular.module('mock.projectRepo', []).service('ProjectRepo', function($q) {
  var repo = mockRepo('ProjectRepo', $q, mockProject, dataProjectRepo1);

  repo.addFieldProfile = function (projectId, fieldProfile, labels) {
    // TODO
    return payloadPromise($q.defer(), true);
  };

  repo.batchPublishDocuments = function (projectId, repositoryId) {
    // TODO
    return payloadPromise($q.defer(), true);
  };

  repo.findByName = function (projectName) {
    var found;
    for (var i in repo.mockedList) {
      if (repo.mockedList[i].name == projectName) {
        found = angular.copy(repo.mockedList[i]);
      }
    }
    return payloadPromise($q.defer(), found);
  };

  repo.getFieldProfileLabels = function (fieldProfileId) {
    // TODO: is this still correct after the redesign using core mocks?
    var response = {"LinkedHashSet": []};
    return payloadPromise($q.defer(), response);
  };

  repo.getIngestTypes = function () {
    return payloadPromise($q.defer(), {});
  };

  repo.getInputTypes = function () {
    return payloadPromise($q.defer(), {});
  };

  repo.syncDocuments = function (projectId) {
    var response;
    if (projectId === false) {
      response = messagePromise($q.defer(), "Simulated Error", "ERROR");
    }
    else {
      var project = repo.findById(projectId);
      if (project) {
        response = payloadPromise($q.defer(), project);
      }
      else {
        response = messagePromise($q.defer(), "Project (ID " + projectId + ") Not Found", "ERROR", 500);
      }
    }

    return response;
  };

  repo.updateFieldProfile = function (projectId, fieldProfile, labels) {
    var response;
    if (projectId === false) {
      response = messagePromise($q.defer(), "Simulated Error", "ERROR");
    }
    else {
      var project = repo.findById(projectId);
      if (project) {
        response = payloadPromise($q.defer(), project);
      }
      else {
        response = messagePromise($q.defer(), "Project (ID " + projectId + ") Not Found", "ERROR", 500);
      }
    }

    return response;
  };

  return repo;
});
