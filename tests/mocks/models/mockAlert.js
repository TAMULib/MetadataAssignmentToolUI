var dataAlert1 = {
    id: 1,
    channel: "unassigned",
    class: "info",
    fade: false,
    fixed: false,
    message: "Generic Alert",
    remove: false,
    time: 1576249725726,
    type: "UNKNOWN"
};

var dataAlert2 = {
    id: 2,
    channel: "project/1/add-field-profile",
    class: "danger",
    fade: true,
    fixed: false,
    message: "(500) No message available",
    remove: true,
    time: 1576249725746,
    type: "ERROR"
};

var dataAlert3 = {
    id: 3,
    channel: "project/1/update-field-profile",
    class: "success",
    fade: false,
    fixed: true,
    message: "Field Profile updated",
    remove: true,
    time: 1576249914577,
    type: "SUCCESS"
};

var mockAlert = function($q) {
    var model = mockModel("Alert", $q, dataAlert1);

    return model;
};

angular.module('mock.alert', []).service('Alert', mockAlert);
