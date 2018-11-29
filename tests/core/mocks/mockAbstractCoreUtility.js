// provide common helper methods to be used by mocks.

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

var messageResponse = function (defer, message, messageStatus, httpStatus) {
     defer.resolve({
        body: angular.toJson({
            meta: {
                status: messageStatus ? messageStatus : 'SUCCESS',
                message: message
            },
            status: httpStatus ? httpStatus : 200
        })
    });
    return defer.promise;
};
