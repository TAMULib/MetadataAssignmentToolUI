var mockResource1 = {
    id: 1,
    document: "plain.txt",
    name: "Resource 001",
    path: "001",
    mimeType: "text/plain"
};

var mockResource2 = {
    id: 2,
    document: "application.pdf",
    name: "Resource 002",
    path: "002",
    mimeType: "application/pdf"
};

var mockResource3 = {
    id: 3,
    document: "image.jpg",
    name: "Resource 003",
    path: "003",
    mimeType: "image/jpeg"
};

angular.module('mock.resource', []).service('Resource', function($q) {
    var model = this;
    var defer;
    var payloadResponse = function (payload) {
        return defer.resolve({
            body: angular.toJson({
                meta: {
                    status: 'SUCCESS'
                },
                payload: payload
            })
        });
    };

    model.isDirty = false;

    model.mock = function(toMock) {
        var keys = ['id', 'document', 'name', 'path', 'mimeType'];
        for (var i in keys) {
            model[keys[i]] = toMock[keys[i]];
        }
    };

    model.clearValidationResults = function () {
    };

    model.delete = function() {
        defer = $q.defer();
        payloadResponse(true);
        return defer.promise;
    };

    model.dirty = function(boolean) {
        model.isDirty = boolean;
    };

    model.filter = function (functionCall) {
        return functionCall(model);
    };

    model.reload = function() {
    };

    model.save = function() {
        defer = $q.defer();
        payloadResponse(true);
        return defer.promise;
    };

    return model;
});
