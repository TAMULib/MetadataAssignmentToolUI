var dataControlledVocabularyRepo1 = [
  dataControlledVocabulary1,
  dataControlledVocabulary2,
  dataControlledVocabulary3
];

var dataControlledVocabularyRepo2 = [
  dataControlledVocabulary3,
  dataControlledVocabulary2,
  dataControlledVocabulary1
];

var dataControlledVocabularyRepo3 = [
  dataControlledVocabulary4,
  dataControlledVocabulary5,
  dataControlledVocabulary6
];

angular.module('mock.controlledVocabularyRepo', []).service('ControlledVocabularyRepo', function($q) {
  var repo = mockRepo('ControlledVocabulary', $q, mockControlledVocabulary, dataControlledVocabulary1);

  return repo;
});
