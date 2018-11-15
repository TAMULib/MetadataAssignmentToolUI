var mockUser1 = {
    email: "aggieJack@library.tamu.edu",
    exp: "1425393875282",
    firstName: "Jack",
    lastName: "Daniels",
    netId: "aggieJack",
    role: "ROLE_ADMIN",
    uin: "123456789"
};

var mockUser2 = {
    email: "aggieJill@library.tamu.edu",
    exp: "1425393875282",
    firstName: "Jill",
    lastName: "Daniels",
    netId: "aggieJill",
    role: "ROLE_USER",
    uin: "987654321"
};

var mockUser3 = {
    email: "jsmith@library.tamu.edu",
    exp: "1425393875282",
    firstName: "Jacob",
    lastName: "Smith",
    netId: "jsmith",
    role: "ROLE_USER",
    uin: "192837465"
};

angular.module('mock.user', []).service('User', function ($q) {
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
        model.lastName = toMock.lastName;
        model.firstName = toMock.firstName;
        model.uin = toMock.uin;
        model.exp = toMock.exp;
        model.email = toMock.email;
        model.role = toMock.role;
        model.netId = toMock.netId;
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
