var mockControlledVocabulary1 = {
    value: "Controlled Vocabulary 001",
    values: []
};

var mockControlledVocabulary2 = {
    value: "Controlled Vocabulary 002",
    values: []
};

var mockControlledVocabulary3 = {
    value: "Controlled Vocabulary 003",
    values: []
};

angular.module('mock.controlledVocabulary', []).service('ControlledVocabulary', function($q) {
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
