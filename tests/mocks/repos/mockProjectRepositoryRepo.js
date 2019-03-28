var dataProjectRepositoryRepo1 = [
    dataProjectRepository1,
    dataProjectRepository2,
    dataProjectRepository3
];

var dataProjectRepositoryRepo2 = [
    dataProjectRepository3,
    dataProjectRepository2,
    dataProjectRepository1
];

var dataProjectRepositoryRepo3 = [
    dataProjectRepository4,
    dataProjectRepository5,
    dataProjectRepository6
];

angular.module('mock.projectRepositoryRepo', []).service('ProjectRepositoryRepo', function($q) {
    var repo = mockRepo('ProjectRepositoryRepo', $q, mockProjectRepository, dataProjectRepositoryRepo1);
    var mockedTypes = {};

    repo.mockTypes = function(toMock) {
        mockedTypes = toMock;
    };

    repo.getTypes = function() {
        return payloadPromise($q.defer(), mockedTypes);
    };

    return repo;
});
