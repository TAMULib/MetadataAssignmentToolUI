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

var mockUser = function($q) {
    var model = mockModel($q, mockUser1);

    return model;
};

angular.module('mock.user', []).service('User', mockUser);
