var mockDocumentRepo1 = [
    {
        id: 1,
        annotator: "",
        fields: [],
        name: "Document 001",
        notes: "",
        path: "",
        project: "Project 001",
        publishedLocations: [],
        status: ""
    },
    {
        id: 2,
        annotator: "",
        fields: [],
        name: "Document 002",
        notes: "",
        path: "",
        project: "Project 001",
        publishedLocations: [],
        status: ""
    },
    {
        id: 3,
        annotator: "",
        fields: [],
        name: "Document 003",
        notes: "",
        path: "",
        project: "Project 001",
        publishedLocations: [],
        status: ""
    }
];

var mockDocumentRepo2 = [
    {
        id: 4,
        annotator: "",
        fields: [],
        name: "Document 004",
        notes: "",
        path: "",
        project: "Project 002",
        publishedLocations: [],
        status: ""
    },
    {
        id: 5,
        annotator: "",
        fields: [],
        name: "Document 005",
        notes: "",
        path: "",
        project: "Project 002",
        publishedLocations: [],
        status: ""
    },
    {
        id: 6,
        annotator: "",
        fields: [],
        name: "Document 006",
        notes: "",
        path: "",
        project: "Project 002",
        publishedLocations: [],
        status: ""
    }
];

var mockDocumentRepo3 = [
    {
        id: 3,
        annotator: "",
        fields: [],
        name: "Document 003",
        notes: "",
        path: "",
        project: "Project 001",
        publishedLocations: [],
        status: ""
    }
];

angular.module('mock.documentRepo', []).service('DocumentRepo', function($q) {
    var repo = mockRepo('DocumentRepo', $q, mockDocument, mockDocumentRepo1);

    repo.fetch = function () {
        return payloadPromise($q.defer(), mockDocumentRepo3);
    };

    repo.get = function (projectName, documentName) {
        var defer = $q.defer();
        var found;
        for (var i in repo.mockedList) {
            var document = repo.mockedList[i];
            if (document.project === projectName && document.name === documentName) {
              found = document;
              break;
            }
        }
        defer.resolve(found);
        return defer.promise;
    };

    return repo;
});
