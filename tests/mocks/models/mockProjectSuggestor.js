var mockProjectSuggestor1 = {
    id: 1,
    projects: []
};

var mockProjectSuggestor2 = {
    id: 2,
    projects: []
};

var mockProjectSuggestor3 = {
    id: 3,
    projects: []
};

var mockProjectSuggestor = function($q) {
    var model = mockModel($q, mockProjectSuggestor1);

    return model;
};

angular.module('mock.projectSuggestor', []).service('ProjectSuggestor', mockProjectSuggestor);

