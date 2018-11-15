var mockAssumedControl1 = {
    button: 'Unassume',
    netid: '',
    status: '',
    user: {
        firstName: "Jack",
        lastName: "Daniels",
        role: "ROLE_ADMIN",
        uin: "123456789"
    }
};

var mockAssumedControl2 = {
    button: 'Unassume',
    netid: '',
    status: '',
    user: {
        firstName: "Jill",
        lastName: "Daniels",
        role: "ROLE_USER",
        uin: "987654321"
    }
};

var mockAssumedControl3 = {
    button: 'Assume',
    netid: '',
    status: '',
    user: {}
};

angular.module('mock.assumedControl', []).service('AssumedControl', function($q) {
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
        model.user = toMock.user;
        model.netid = toMock.netid;
        model.button = toMock.button;
        model.status = toMock.status;
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

    model.fetch = function() {
        defer = $q.defer();
        payloadResponse(mockAssumedControl3);
        return defer.promise;
    };

    model.get = function() {
        defer = $q.defer();
        payloadResponse(mockAssumedControl3);
        return defer.promise;
    };

    model.reload = function() {
    };

    model.save = function() {
        defer = $q.defer();
        payloadResponse(true);
        return defer.promise;
    };

    model.set = function() {
        defer = $q.defer();
        payloadResponse(true);
        return defer.promise;
    };

    return model;
});
