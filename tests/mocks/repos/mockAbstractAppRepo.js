var mockAbstractAppRepo1 = [
    {
        id: 1
    },
    {
        id: 2
    },
    {
        id: 3
    }
];

var mockAbstractAppRepo2 = [
    {
        id: 4
    },
    {
        id: 5
    },
    {
        id: 6
    }
];

var mockAbstractAppRepo3 = [
    {
        id: 3
    }
];

angular.module('mock.abstractRepo', []).service('AbstractRepo', function($q) {
    var repo = mockRepo('AbstractRepo', $q, mockDocument, mockAbstractRepo1);

    return repo;
});
