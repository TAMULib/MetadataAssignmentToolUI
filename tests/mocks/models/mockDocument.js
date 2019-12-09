var dataDocument1 = {
    id: 1,
    annotator: "",
    fields: [
        {
            id: 1,
            label: {
                profile: {defaultValue: ''},
                value: "Value 001"
            },
            values: []
        }
    ],
    name: "Document 001",
    notes: "",
    path: "",
    project: "Project 001",
    publishedLocations: [],
    publishing: false,
    status: ""
};

var dataDocument2 = {
    id: 2,
    annotator: "",
    fields: [
        {
            id: 2,
            label: {
                profile: {defaultValue: ''},
                value: "Value 002"
            },
            values: [{
                field: 1,
                value: "first"
            }]
        }
    ],
    name: "Document 002",
    notes: "",
    path: "",
    project: "Project 001",
    publishedLocations: [],
    publishing: false,
    status: ""
};

var dataDocument3 = {
    id: 3,
    annotator: "",
    fields: [],
    name: "Document 003",
    notes: "",
    path: "",
    project: "Project 002",
    publishedLocations: [],
    publishing: false,
    status: ""
};

var dataDocument4 = {
    id: 4,
    annotator: "",
    fields: [],
    name: "Document 004",
    notes: "",
    path: "",
    project: "Project 003",
    publishedLocations: [],
    publishing: false,
    status: ""
};

var dataDocument5 = {
    id: 5,
    annotator: "",
    fields: [],
    name: "Document 005",
    notes: "",
    path: "",
    project: "Project 003",
    publishedLocations: [],
    publishing: false,
    status: ""
};

var dataDocument6 = {
    id: 6,
    annotator: "",
    fields: [],
    name: "Document 006",
    notes: "",
    path: "",
    project: "Project 004",
    publishedLocations: [],
    publishing: false,
    status: ""
};

var mockDocument = function($q) {
    var model = mockModel("Document", $q, dataDocument1);

    model.getSuggestions = function() {
        var suggestions = [];
        // TODO
        return payloadPromise($q.defer(), suggestions);
    };

    model.push = function() {
        return payloadPromise($q.defer(), true);
    };

    model.getProject = function() {
        var project = new mockProject(q);

        if (model.project == dataProject2.name) {
            project.mock(dataProject2);
        } else if (model.project == dataProject3.name) {
            project.mock(dataProject3);
        } else if (model.project == dataProject4.name) {
            project.mock(dataProject4);
        } else if (model.project == dataProject5.name) {
            project.mock(dataProject5);
        } else if (model.project == dataProject6.name) {
            project.mock(dataProject6);
        }

        return payloadPromise($q.defer(), project);
    };

    return model;
};

angular.module('mock.document', []).service('Document', mockDocument);
