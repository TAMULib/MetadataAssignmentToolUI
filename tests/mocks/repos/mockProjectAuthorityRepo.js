var mockProjectAuthorityRepo1 = [
    {
        id: 1,
        projects: []
    },
    {
        id: 2,
        projects: []
    },
    {
        id: 3,
        projects: []
    }
];

var mockProjectAuthorityRepo2 = [
    {
        id: 4,
        projects: []
    },
    {
        id: 5,
        projects: []
    },
    {
        id: 6,
        projects: []
    }
];

var mockProjectAuthorityRepo3 = [
    {
        id: 3,
        projects: []
    }
];

angular.module('mock.projectAuthorityRepo', []).service('ProjectAuthorityRepo', function($q) {
    var repo = mockRepo('ProjectAuthorityRepo', $q, mockProjectAuthority, mockProjectAuthorityRepo1);
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

