angular.module('mock.modalService', []).service('ModalService', function ($q) {
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

    service.openModal = function (id) {
    };

    service.closeModal = function () {
    };

    return service;
});
