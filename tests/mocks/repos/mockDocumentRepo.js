var dataDocumentRepo1 = [
    dataDocument1,
    dataDocument2,
    dataDocument3
];

var dataDocumentRepo2 = [
    dataDocument3,
    dataDocument2,
    dataDocument1
];

var dataDocumentRepo3 = [
    dataDocument4,
    dataDocument5,
    dataDocument6
];

angular.module('mock.documentRepo', []).service('DocumentRepo', function($q) {
    var repo = mockRepo('DocumentRepo', $q, mockDocument, dataDocumentRepo1);

    repo.fetch = function () {
        return payloadPromise($q.defer(), dataDocumentRepo3);
    };

    repo.get = function (projectName, documentName) {
        var defer = $q.defer();
        var found;
        for (var i in repo.mockedList) {
            var document = repo.mockedList[i];
            if (document.project === projectName && document.name === documentName) {
              found = document;
              break;
            }
        }
        defer.resolve(found);
        return defer.promise;
    };

    return repo;
});
