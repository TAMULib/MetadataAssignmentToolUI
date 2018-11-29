var mockProject1 = {
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

var mockProject2 = {
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

var mockProject3 = {
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
    var model = mockModel($q, mockProject1);

    return model;
};

angular.module('mock.project', []).service('Project', mockProject);

