angular.module("mock.wsApi", []).service("WsApi", function ($q) {
  var service = mockService($q);
  var mapping;
  var fetchResponse;

  service.mockFetchResponse = function (data) {
    if (data === null || data === undefined) {
      fetchResponse = undefined;
    } else {
      // using hasOwnProperty() to support special test cases (such as checks to see if payload is undefined).
      fetchResponse = {
        type: data.hasOwnProperty("type") ? data.type : null,
        payload: data.hasOwnProperty("payload") ? data.payload : {},
        messageStatus: data.hasOwnProperty("messageStatus") ? data.messageStatus : null,
        httpStatus: data.hasOwnProperty("httpStatus") ? data.httpStatus : null,
        valueType: data.hasOwnProperty("valueType") ? data.valueType : null
      };
    }
  };

  service.mockMapping = function (toMock) {
    mapping = {};
    for (var key in toMock) {
      mapping[key] = toMock[key];
    }
  };

  service.fetch = function (apiReq, parameters) {
    var payload = {};

    if (fetchResponse) {
      switch (fetchResponse.type) {
        case "message":
          return messagePromise($q.defer(), fetchResponse.payload, fetchResponse.messageStatus, fetchResponse.httpStatus);
        case "value":
          return valuePromise($q.defer(), fetchResponse.payload, fetchResponse.valueType);
        case "payload":
          return payloadPromise($q.defer(), fetchResponse.payload, fetchResponse.messageStatus, fetchResponse.httpStatus);
        case "data":
          return dataPromise($q.defer(), fetchResponse.payload, fetchResponse.messageStatus, fetchResponse.httpStatus);
        case "reject":
          return rejectPromise($q.defer(), fetchResponse.payload, fetchResponse.messageStatus, fetchResponse.httpStatus);
        case "failure":
          return failurePromise($q.defer(), fetchResponse.payload, fetchResponse.messageStatus, fetchResponse.httpStatus);
      }
    } else {
      switch (apiReq.method) {
        case "credentials":
          payload = dataUser1;
          break;
        case "page":
          payload = dataDocumentPage1;
          break;
        case "all":
          switch (apiReq.controller) {
            case "user":
              payload = dataUser1;
              break;
            case "document":
              payload = dataDocument1;
              break;
            case "cv":
              payload = dataControlledVocabulary1;
              break;
          }
          break;
        case "get":
          switch (apiReq.controller) {
            case "user":
              payload = dataUser1;
              break;
            case "metadata":
              payload = dataMetadata1;
              break;
            case "document":
              payload = dataDocument1;
              break;
          }
          break;
        case "update_role":
          dataUser1.role = JSON.parse(apiReq.data).role;
          payload = dataUser1;
          break;
        case "update_annotator":
          dataDocument1.annatator = JSON.parse(apiReq.data).annotator;
          payload = dataDocumentRepo1;
          break;
      }
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
