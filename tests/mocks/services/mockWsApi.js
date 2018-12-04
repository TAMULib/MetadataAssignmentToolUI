angular.module('mock.wsApi', []).service('WsApi', function ($q) {
    var service = this;
    var defer;
    var mapping;

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

    service.mockMapping = function(toMock) {
        mapping = {};
        for (var key in toMock) {
            mapping[key] = toMock[key];
        }
    };

    service.fetch = function (apiReq) {
        defer = $q.defer();

        var payload = {};

        switch (apiReq.method) {
            case 'credentials':
                payload = mockUser1;
                break;
            case 'page':
                payload = mockDocumentPage1;
                break;
            case 'all':
                switch (apiReq.controller) {
                    case 'user':
                        payload = mockUserRepo1;
                        break;
                    case 'document':
                        payload = mockDocumentRepo1;
                        break;
                    case 'cv':
                        payload = mockControlledVocabulary1;
                        break;
                }
                break;
            case 'get':
                switch (apiReq.controller) {
                    case 'user':
                        payload = mockUser1;
                        break;
                    case 'metadata':
                        payload = mockMetadata1;
                        break;
                    case 'document':
                        payload = mockDocumentRepo1;
                        break;
                }
                break;
            case 'update_role':
                mockUserRepo1.HashMap[2].role = JSON.parse(apiReq.data).role;
                payload = mockUserRepo1;
                break;
            case 'update_annotator':
                mockDocumentRepo1.HashMap.annatator = JSON.parse(apiReq.data).annotator;
                payload = mockDocumentRepo1;
                break;
        }

        payloadResponse(payload);

        return defer.promise;
    };

    service.getMapping = function () {
        return mapping;
    };

    service.listen = function (apiReq) {
        defer = $q.defer();
        return defer.promise;
    };

    return service;
});
