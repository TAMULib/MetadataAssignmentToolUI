var mockResource1 = {
    document: "plain.txt",
    name: "Resource 001",
    path: "001",
    mimeType: "text/plain"
};

var mockResource2 = {
    document: "application.pdf",
    name: "Resource 002",
    path: "002",
    mimeType: "application/pdf"
};

var mockResource3 = {
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
        model.id = toMock.id;
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

    model.reload = function() {
    };

    model.save = function() {
        defer = $q.defer();
        payloadResponse(true);
        return defer.promise;
    };

    return model;
});
