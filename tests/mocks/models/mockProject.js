var dataProject1 = {
  id: 1,
  authorities: [],
  documents: [],
  headless: false,
  injestType: null,
  name: "Project 001",
  locked: false,
  profiles: [],
  repositories: [],
  suggestors: []
};

var dataProject2 = {
  id: 2,
  authorities: [],
  documents: [],
  headless: false,
  injestType: null,
  name: "Project 002",
  locked: false,
  profiles: [],
  repositories: [],
  suggestors: []
};

var dataProject3 = {
  id: 3,
  authorities: [],
  documents: [],
  headless: false,
  injestType: null,
  name: "Project 003",
  locked: false,
  profiles: [],
  repositories: [],
  suggestors: []
};

var mockProject = function($q) {
  var model = mockModel("Project", $q, dataProject1);

  return model;
};

angular.module('mock.project', []).service('Project', mockProject);

