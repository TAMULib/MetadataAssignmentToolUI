var mockUserService1 = {
    "lastName": "Daniels",
    "firstName": "Jack",
    "uin": "123456789",
    "exp": "1425393875282",
    "email": "aggieJack@library.tamu.edu",
    "role": "ROLE_ADMIN",
    "netId": "aggieJack"
};

var mockUserService2 = {
    "lastName": "Daniels",
    "firstName": "Jill",
    "uin": "987654321",
    "exp": "1425393875282",
    "email": "aggieJill@library.tamu.edu",
    "role": "ROLE_USER",
    "netId": "aggieJill"
};

var mockUserService3 = {
    "lastName": "Smith",
    "firstName": "Jacob",
    "uin": "192837465",
    "exp": "1425393875282",
    "email": "jsmith@library.tamu.edu",
    "role": "ROLE_USER",
    "netId": "jsmith"
};

angular.module('mock.userService', []).service('UserService', function ($q) {
    var service = this;
    var defer;
    var currentUser = mockUserService1;

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

    var messageResponse = function (message) {
        return defer.resolve({
            body: angular.toJson({
                meta: {
                    status: 'SUCCESS',
                    message: message
                }
            })
        });
    };

    service.mockCurrentUser = function(toMock) {
        currentUser.lastName = toMock.lastName;
        currentUser.firstName = toMock.firstName;
        currentUser.uin = toMock.uin;
        currentUser.exp = toMock.exp;
        currentUser.email = toMock.email;
        currentUser.role = toMock.role;
        currentUser.netId = toMock.netId;
    };

    service.getCurrentUser = function () {
        defer = $q.defer();
        payloadResponse(mockUserService1);
        return defer.promise;
    };

    service.userReady = function () {
        defer = $q.defer();
        payloadResponse(true);
        return defer.promise;
    };

    return service;
});
