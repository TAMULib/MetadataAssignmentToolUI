var mockMetadataRepo1 = [
    {
        id: 1,
        document: "",
        label: "Metadata 001",
        values: []
    },
    {
        id: 2,
        document: "",
        label: "Metadata 002",
        values: []
    },
    {
        id: 3,
        document: "",
        label: "Metadata 003",
        values: []
    }
];

var mockMetadataRepo2 = [
    {
        id: 4,
        document: "",
        label: "Metadata 004",
        values: []
    },
    {
        id: 5,
        document: "",
        label: "Metadata 005",
        values: []
    },
    {
        id: 6,
        document: "",
        label: "Metadata 006",
        values: []
    }
];

var mockMetadataRepo3 = [
    {
        id: 3,
        document: "",
        label: "Metadata 003",
        values: []
    }
];

angular.module('mock.metadataRepo', []).service('MetadataRepo', function($q) {
    var repo = mockRepo('MetadataRepo', $q, mockMetadata, mockMetadataRepo1);

    repo.export = function (project, format) {
        return payloadPromise($q.defer(), {});
    };

    repo.get = function(document) {
        return angular.copy(mockMetadata);
    };

    repo.getByStatus = function (status) {
        // TODO
        return payloadPromise($q.defer(), angular.copy(mockMetadata));
    };

    repo.getHeaders = function (format, project) {
        var response = {"ArrayList<String>": ["header1", "header2", "header3"]};
        return payloadPromise($q.defer(), response);
    };

    repo.unlockProject = function (project) {
        return payloadPromise($q.defer(), true);
    };

    return repo;
});
