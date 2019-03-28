angular.module('mock.wsApi', []).service('WsApi', function ($q) {
    var service = mockService($q);
    var mapping;

    service.mockMapping = function(toMock) {
        mapping = {};
        for (var key in toMock) {
            mapping[key] = toMock[key];
        }
    };

    service.fetch = function (apiReq) {
        var payload = {};

        switch (apiReq.method) {
            case 'credentials':
                payload = dataUser1;
                break;
            case 'page':
                payload = dataDocumentPage1;
                break;
            case 'all':
                switch (apiReq.controller) {
                    case 'user':
                        payload = dataUser1;
                        break;
                    case 'document':
                        payload = dataDocument1;
                        break;
                    case 'cv':
                        payload = dataControlledVocabulary1;
                        break;
                }
                break;
            case 'get':
                switch (apiReq.controller) {
                    case 'user':
                        payload = dataUser1;
                        break;
                    case 'metadata':
                        payload = dataMetadata1;
                        break;
                    case 'document':
                        payload = dataDocument1;
                        break;
                }
                break;
            case 'update_role':
                dataUser1.role = JSON.parse(apiReq.data).role;
                payload = dataUser1;
                break;
            case 'update_annotator':
                dataDocument1.annatator = JSON.parse(apiReq.data).annotator;
                payload = dataDocumentRepo1;
                break;
        }

        return payloadPromise($q.defer(), payload);
    };

    service.getMapping = function () {
        return mapping;
    };

    service.listen = function (apiReq) {
        return payloadPromise($q.defer());
    };

    return service;
});
