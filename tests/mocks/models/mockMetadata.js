var mockMetadata1 = {
    id: 1,
    document: "",
    label: "Metadata 001",
    values: []
};

var mockMetadata2 = {
    id: 2,
    document: "",
    label: "Metadata 002",
    values: []
};

var mockMetadata3 = {
    id: 3,
    document: "",
    label: "Metadata 003",
    values: []
};

var mockMetadata = function($q) {
    var model = mockModel($q, mockMetadata1);

    return model;
};

angular.module('mock.metadata', []).service('Metadata', mockMetadata);
