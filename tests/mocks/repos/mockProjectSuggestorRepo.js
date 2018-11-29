var mockProjectSuggestorRepo1 = [
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

var mockProjectSuggestorRepo2 = [
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

var mockProjectSuggestorRepo3 = [
    {
        id: 3,
        projects: []
    }
];

angular.module('mock.projectSuggestorRepo', []).service('ProjectSuggestorRepo', function($q) {
    var repo = mockRepo('ProjectSuggestorRepo', $q, mockProjectSuggestor, mockProjectSuggestorRepo1);
    var mockedTypes = {};

    repo.mockTypes = function(toMock) {
        mockedTypes = toMock;
    };

    repo.getTypes = function() {
        return payloadPromise($q.defer(), mockedTypes);
    };

    return repo;
});
