angular.module('mock.alertService', []).service('AlertService', function ($q) {
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

    service.add = function (meta, channel) {
        defer = $q.defer();
        payloadResponse();
        return defer.promise;
    };

    service.addAlertServiceError = function (error) {
        defer = $q.defer();
        payloadResponse();
        return defer.promise;
    };

    service.clearTypeStores = function () {
        defer = $q.defer();
        payloadResponse();
        return defer.promise;
    };

    service.create = function (facet, exclusion) {
        defer = $q.defer();
        payloadResponse();
        return defer.promise;
    };

    service.get = function (facet) {
        defer = $q.defer();
        payloadResponse();
        return defer.promise;
    };

    service.remove = function (alert) {
        defer = $q.defer();
        payloadResponse();
        return defer.promise;
    };

    service.removeAll = function (facet) {
        defer = $q.defer();
        payloadResponse();
        return defer.promise;
    };

    return service;
});
