var mockControlledVocabularyRepo1 = [
    {
        id: 1,
        value: "Controlled Vocabulary 001",
        values: []
    },
    {
        id: 2,
        value: "Controlled Vocabulary 002",
        values: []
    },
    {
        id: 3,
        value: "Controlled Vocabulary 003",
        values: []
    }
];

var mockControlledVocabularyRepo2 = [
    {
        id: 4,
        value: "Controlled Vocabulary 004",
        values: []
    },
    {
        id: 5,
        value: "Controlled Vocabulary 005",
        values: []
    },
    {
        id: 6,
        value: "Controlled Vocabulary 006",
        values: []
    }
];

var mockControlledVocabularyRepo3 = [
    {
        id: 3,
        value: "Controlled Vocabulary 003",
        values: []
    }
];

angular.module('mock.controlledVocabularyRepo', []).service('ControlledVocabularyRepo', function($q) {
    var repo = mockRepo('ControlledVocabulary', $q, mockControlledVocabulary, mockControlledVocabulary1);

    return repo;
});
