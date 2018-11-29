var payloadPromise = function (defer, payload, messageStatus, httpStatus) {
    defer.resolve({
        body: angular.toJson({
            meta: {
                status: messageStatus ? messageStatus : 'SUCCESS',
            },
            payload: payload,
            status: httpStatus ? httpStatus : 200
        })
    });
    return defer.promise;
};

var mockModel = function ($q, mockDataObj) {
    var model = {};

    model.isDirty = false;

    model.mock = function(toMock) {
        var keys = Object.keys(mockDataObj);
        for (var i in keys) {
            model[keys[i]] = toMock[keys[i]];
        }
    };

    model.mock(mockDataObj);

    model.clearValidationResults = function () {

    };

    model.delete = function() {
        return payloadPromise($q.defer(), true);
    };

    model.dirty = function(boolean) {
        model.isDirty = boolean;
    };

    model.reload = function() {

    };

    model.save = function() {
        return payloadPromise($q.defer(), true);
    };

    return model;
}