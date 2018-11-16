angular.module('mock.alertService', []).service('AlertService', function ($q) {
    var service = this;
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
