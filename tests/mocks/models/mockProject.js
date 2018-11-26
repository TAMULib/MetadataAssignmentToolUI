var mockProject1 = {
    id: 1,
    authorities: [],
    documents: [],
    headless: false,
    injestType: null,
    name: "Project 001",
    locked: false,
    profiles: [],
    repositories: [],
    suggestors: []
};

var mockProject2 = {
    id: 2,
    authorities: [],
    documents: [],
    headless: false,
    injestType: null,
    name: "Project 002",
    locked: false,
    profiles: [],
    repositories: [],
    suggestors: []
};

var mockProject3 = {
    id: 3,
    authorities: [],
    documents: [],
    headless: false,
    injestType: null,
    name: "Project 003",
    locked: false,
    profiles: [],
    repositories: [],
    suggestors: []
};

angular.module('mock.project', []).service('Project', function($q) {
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
        var keys = ['id', 'authorities', 'documents', 'headless', 'injestType', 'name', 'locked', 'profiles', 'repositories', 'suggestors'];
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

    model.reload = function() {
    };

    model.save = function() {
        defer = $q.defer();
        payloadResponse(true);
        return defer.promise;
    };

    return model;
});
