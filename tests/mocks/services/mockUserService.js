var mockUserService1 = {
    anonymous: false,
    email: "aggieJack@library.tamu.edu",
    exp: "1425393875282",
    firstName: "Jack",
    lastName: "Daniels",
    netId: "aggieJack",
    role: "ROLE_ADMIN",
    uin: "123456789"
};

var mockUserService2 = {
    anonymous: false,
    email: "aggieJill@library.tamu.edu",
    exp: "1425393875282",
    firstName: "Jill",
    lastName: "Daniels",
    netId: "aggieJill",
    role: "ROLE_ADMIN",
    uin: "987654321"
};

var mockUserService3 = {
    anonymous: false,
    email: "jsmith@library.tamu.edu",
    exp: "1425393875282",
    firstName: "Jacob",
    lastName: "Smith",
    netId: "jsmith",
    role: "ROLE_USER",
    uin: "192837465"
};

var mockUserService4 = {
    anonymous: true,
    email: "",
    exp: "",
    firstName: "",
    lastName: "",
    netId: "",
    role: "ROLE_ANONYMOUS",
    uin: ""
};

angular.module('mock.userService', []).service('UserService', function ($q) {
    var service = this;
    var defer;
    var currentUser = mockUserService1;

    var payloadResponse = function (payload, messageStatus, httpStatus) {
        return defer.resolve({
            body: angular.toJson({
                meta: {
                    status: messageStatus ? messageStatus : 'SUCCESS',
                },
                payload: payload,
                status: httpStatus ? httpStatus : 200
            })
        });
    };

    var messageResponse = function (message, messageStatus, httpStatus) {
        return defer.resolve({
            body: angular.toJson({
                meta: {
                    status: messageStatus ? messageStatus : 'SUCCESS',
                    message: message
                },
                status: httpStatus ? httpStatus : 200
            })
        });
    };

    service.mockCurrentUser = function(toMock) {
        delete sessionStorage.role;

        currentUser.anonymous = toMock.anonymous;
        currentUser.email = toMock.email;
        currentUser.exp = toMock.exp;
        currentUser.firstName = toMock.firstName;
        currentUser.lastName = toMock.lastName;
        currentUser.netId = toMock.netId;
        currentUser.role = toMock.role;
        currentUser.uin = toMock.uin;

        sessionStorage.role = toMock.role;
    };

    service.fetchUser = function () {
        defer = $q.defer();
        delete sessionStorage.role;
        defer.resolve(currentUser);
        sessionStorage.role = currentUser.role;
        return defer.promise;
    };

    service.getCurrentUser = function () {
        return currentUser;
    };

    service.setCurrentUser = function (user) {
        angular.extend(currentUser, user);
    };

    service.userEvents = function () {
        defer = $q.defer();
        return defer.promise;
    };

    service.userReady = function () {
        defer = $q.defer();
        defer.resolve(currentUser);
        return defer.promise;
    };

    return service;
});
