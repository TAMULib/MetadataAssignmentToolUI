var mockDocument1 = {
    'id': 1,
    'project': {}
};

var mockDocument2 = {
    'id': 2,
    'project': {}
};

var mockDocument3 = {
    'id': 3,
    'project': {}
};

angular.module('mock.document', []).service('Document', function($q) {
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
        model.project = toMock.project;
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

    model.getProject = function() {
        defer = $q.defer();
        payloadResponse(model.project);
        return defer.promise;
    };

    model.getSuggestions = function() {
        defer = $q.defer();
        var suggestions = [];
        // TODO
        payloadResponse(suggestions);
        return defer.promise;
    };

    model.push = function() {
        defer = $q.defer();
        payloadResponse(true);
        return defer.promise;
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
