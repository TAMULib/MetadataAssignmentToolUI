var mockDocument1 = {
    id: 1,
    annotator: "",
    fields: [],
    name: "Document 001",
    notes: "",
    path: "",
    project: {},
    publishedLocations: [],
    status: ""
};

var mockDocument2 = {
    id: 2,
    annotator: "",
    fields: [],
    name: "Document 002",
    notes: "",
    path: "",
    project: {},
    publishedLocations: [],
    status: ""
};

var mockDocument3 = {
    id: 3,
    annotator: "",
    fields: [],
    name: "Document 003",
    notes: "",
    path: "",
    project: {},
    publishedLocations: [],
    status: ""
};

var mockDocument = function($q) {

    var model = mockModel($q, mockDocument1);

    model.getSuggestions = function() {
        var suggestions = [];
        // TODO
        return payloadPromise($q.defer(), suggestions);
    };

    model.push = function() {
        return payloadPromise($q.defer(), true);
    };

    model.getProject = function() {
        // FIXME: should return a project, but it would be preferred to not depend on `mockProject1` from a separate mock.
        return payloadPromise($q.defer(), mockProject1);
    };

    return model;
};

angular.module('mock.document', []).service('Document', mockDocument);
