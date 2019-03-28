var dataProjectSuggestorRepo1 = [
    dataProjectSuggestor1,
    dataProjectSuggestor2,
    dataProjectSuggestor3
];

var dataProjectSuggestorRepo2 = [
    dataProjectSuggestor3,
    dataProjectSuggestor2,
    dataProjectSuggestor1
];

var dataProjectSuggestorRepo3 = [
    dataProjectSuggestor4,
    dataProjectSuggestor5,
    dataProjectSuggestor6
];

angular.module('mock.projectSuggestorRepo', []).service('ProjectSuggestorRepo', function($q) {
    var repo = mockRepo('ProjectSuggestorRepo', $q, mockProjectSuggestor, dataProjectSuggestorRepo1);
    var mockedTypes = {};

    repo.mockTypes = function(toMock) {
        mockedTypes = toMock;
    };

    repo.getTypes = function() {
        return payloadPromise($q.defer(), mockedTypes);
    };

    return repo;
});
