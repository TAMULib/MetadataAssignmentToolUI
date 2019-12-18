var dataFieldProfile1 = {
  id: 1,
  defaultValue: "",
  gloss: "Mock Field Profile 1",
  hidden: false,
  inputType: "TEXT",
  labels: [],
  project: null,
  readOnly: false,
  repeatable: false,
  required: false,
  values: []
};

var dataFieldProfile2 = {
  id: 2,
  defaultValue: "",
  gloss: "Mock Field Profile 2",
  hidden: false,
  inputType: "TEXTAREA",
  labels: [],
  project: null,
  readOnly: false,
  repeatable: false,
  required: false,
  values: []
};

var dataFieldProfile3 = {
  id: 3,
  defaultValue: "",
  gloss: "Mock Field Profile 3",
  hidden: true,
  inputType: "SUGGESTION",
  labels: [],
  project: null,
  readOnly: true,
  repeatable: true,
  required: true,
  values: []
};

var mockFieldProfile = function ($q) {
  var model = mockModel("FieldProfile", $q, dataFieldProfile1);

  return model;
};

angular.module("mock.fieldProfile", []).service("FieldProfile", mockFieldProfile);
