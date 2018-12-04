var mockResource1 = {
    id: 1,
    document: "Document 001",
    name: "Resource 001",
    path: "001",
    mimeType: "text/plain"
};

var mockResource2 = {
    id: 2,
    document: "Document 001",
    name: "Resource 002",
    path: "002",
    mimeType: "application/pdf"
};

var mockResource3 = {
    id: 3,
    document: "Document 001",
    name: "Resource 003",
    path: "003",
    mimeType: "image/jpeg"
};

var mockResource = function($q) {
    var model = mockModel($q, mockResource1);

    model.filter = function (functionCall) {
        return functionCall(model);
    };

    return model;
};

angular.module('mock.resource', []).service('Resource', mockResource);
