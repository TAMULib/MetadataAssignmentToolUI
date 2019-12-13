var dataControlledVocabulary1 = {
  id: 1,
  value: "Controlled Vocabulary 001",
  values: []
};

var dataControlledVocabulary2 = {
  id: 2,
  value: "Controlled Vocabulary 002",
  values: []
};

var dataControlledVocabulary3 = {
  id: 3,
  value: "Controlled Vocabulary 003",
  values: []
};

var mockControlledVocabulary = function($q) {
  var model = mockModel("ControlledVocabulary", $q, dataControlledVocabulary1);

  return model;
};

angular.module('mock.controlledVocabulary', []).service('ControlledVocabulary', mockControlledVocabulary);
