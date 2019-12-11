var dataPublishingEvent1 = {
    id: 1,
    type: "MESSAGE",
    message: "message 1 - message",
    timestamp: 1575989033
};

var dataPublishingEvent2 = {
    id: 2,
    type: "CONNECTION",
    message: "message 2 - connection",
    timestamp: 1575989034
};

var dataPublishingEvent3 = {
    id: 3,
    type: "ALERT",
    message: "message 3 - alert",
    timestamp: 1575989035
};

var mockPublishingEvent = function($q) {
    var model = mockModel("PublishingEvent", $q, dataPublishingEvent1);

    return model;
};

angular.module('mock.publishingEvent', []).service('PublishingEvent', mockPublishingEvent);
