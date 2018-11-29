var mockResourceRepo1 = [
    {
        id: 1,
        document: "1",
        mimeType: "text/plain",
        name: "Resource 001",
        path: "001"
    },
    {
        id: 2,
        document: "1",
        mimeType: "application/pdf",
        name: "Resource 002",
        path: "002"
    },
    {
        id: 3,
        document: "1",
        mimeType: "image/jpeg",
        name: "Resource 003",
        path: "003"
    }
];

var mockResourceRepo2 = [
    {
        id: 4,
        document: "1",
        mimeType: "text/plain",
        name: "Resource 004",
        path: "004"
    },
    {
        id: 5,
        document: "1",
        mimeType: "application/pdf",
        name: "Resource 005",
        path: "005"
    },
    {
        id: 6,
        document: "1",
        mimeType: "image/jpeg",
        name: "Resource 006",
        path: "006"
    }
];

var mockResourceRepo3 = [
    {
        id: 3,
        document: "1",
        mimeType: "image/jpeg",
        name: "Resource 003",
        path: "003"
    }
];

angular.module('mock.resourceRepo', []).service('ResourceRepo', function($q) {
    var repo = mockRepo('ResourceRepo', $q, mockResource, mockResourceRepo1);

    repo.getAllByProjectNameAndDocumentName = function(projectName, documentName) {
        defer = $q.defer();
        var found = [];
        for (var i in repo.mockedList) {
            var resource = repo.mockedList[i];
            found.push(angular.extend(mockResource($q), resource));
        }
        defer.resolve(found);
        return defer.promise;
    };

    return repo;
});
