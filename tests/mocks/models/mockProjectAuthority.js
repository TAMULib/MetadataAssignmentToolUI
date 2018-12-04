var mockProjectAuthority1 = {
    id: 1,
    projects: []
};

var mockProjectAuthority2 = {
    id: 2,
    projects: []
};

var mockProjectAuthority3 = {
    id: 3,
    projects: []
};

var mockProjectAuthority = function($q) {
    var model = mockModel($q, mockProjectAuthority1);

    return model;
};

angular.module('mock.projectAuthority', []).service('ProjectAuthority', mockProjectAuthority);

