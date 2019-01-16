var dataResource1 = {
    id: 1,
    document: "Document 001",
    name: "Resource 001",
    path: "001",
    mimeType: "text/plain"
};

var dataResource2 = {
    id: 2,
    document: "Document 001",
    name: "Resource 002",
    path: "002",
    mimeType: "application/pdf"
};

var dataResource3 = {
    id: 3,
    document: "Document 001",
    name: "Resource 003",
    path: "003",
    mimeType: "image/jpeg"
};

var dataResource4 = {
    id: 4,
    document: "Document 004",
    name: "Resource 001",
    path: "001",
    mimeType: "text/plain"
};

var dataResource5 = {
    id: 5,
    document: "Document 005",
    name: "Resource 002",
    path: "002",
    mimeType: "application/pdf"
};

var dataResource6 = {
    id: 6,
    document: "Document 006",
    name: "Resource 003",
    path: "003",
    mimeType: "image/jpeg"
};

var mockResource = function($q) {
    var model = mockModel("Resource", $q, dataResource1);

    model.filter = function (functionCall) {
        return functionCall(model);
    };

    return model;
};

angular.module('mock.resource', []).service('Resource', mockResource);
