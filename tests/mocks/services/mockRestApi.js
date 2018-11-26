angular.module('mock.restApi', []).service('RestApi', function ($q) {
    var service = this;
    var defer;

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

    service.get = function () {
        defer = $q.defer();
        return defer.promise;
    };

    service.head = function () {
        defer = $q.defer();
        return defer.promise;
    };

    service.post = function () {
        defer = $q.defer();
        return defer.promise;
    };

    service.put = function () {
        defer = $q.defer();
        return defer.promise;
    };

    return service;
});
