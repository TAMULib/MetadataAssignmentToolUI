var mockAssumedControl1 = {
    id: 1,
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
    id: 2,
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
    id: 3,
    button: 'Assume',
    netid: '',
    status: '',
    user: {}
};

var mockAssumedControl = function($q) {
    var model = mockModel($q, mockAssumedControl1);

    model.addCallback = function(callback) {
        // TODO
    };

    model.assume = function() {
        // TODO
        return payloadPromise($q.defer(), null);
    };

    model.cancel = function() {
        // TODO
    };

    model.get = function() {
        return payloadPromise($q.defer(), mockAssumedControl3);
    };

    model.ready = function() {
        // TODO
        return payloadPromise($q.defer(), null);
    };

    model.set = function() {
        return payloadPromise($q.defer(), true);
    };

    model.unassume = function() {
        // TODO
        return payloadPromise($q.defer(), null);
    };

    return model;
};

angular.module('mock.assumedControl', []).service('AssumedControl', mockAssumedControl);
