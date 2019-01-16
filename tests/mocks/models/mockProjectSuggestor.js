var dataProjectSuggestor1 = {
    id: 1,
    projects: []
};

var dataProjectSuggestor2 = {
    id: 2,
    projects: []
};

var dataProjectSuggestor3 = {
    id: 3,
    projects: []
};

var dataProjectSuggestor4 = {
    id: 4,
    projects: []
};

var dataProjectSuggestor5 = {
    id: 5,
    projects: []
};

var dataProjectSuggestor6 = {
    id: 6,
    projects: []
};

var mockProjectSuggestor = function($q) {
    var model = mockModel("ProjectSuggestor", $q, dataProjectSuggestor1);

    return model;
};

angular.module('mock.projectSuggestor', []).service('ProjectSuggestor', mockProjectSuggestor);

