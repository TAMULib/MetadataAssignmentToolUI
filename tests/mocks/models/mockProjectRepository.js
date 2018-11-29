var mockProjectRepository1 = {
    id: 1,
    projects: []
};

var mockProjectRepository2 = {
    id: 2,
    projects: []
};

var mockProjectRepository3 = {
    id: 3,
    projects: []
};

var mockProjectRepository = function($q) {
    var model = mockModel($q, mockProjectRepository1);

    return model;
};

angular.module('mock.projectRepository', []).service('ProjectRepository', mockProjectRepository);

