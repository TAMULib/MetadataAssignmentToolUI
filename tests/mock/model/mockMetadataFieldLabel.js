var dataMetadataFieldLabel1 = {
  id: 1,
  name: "MetadataFieldLabel 1",
  profile: {
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
  }
};

var dataMetadataFieldLabel2 = {
  id: 2,
  name: "MetadataFieldLabel 2",
  profile: {
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
  }
};

var dataMetadataFieldLabel3 = {
  id: 3,
  name: "MetadataFieldLabel 3",
  profile: {
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
  }
};

// Note: MetadataFieldLabel actually represents the model for MetadataFieldLabelFieldGroup.
var mockMetadataFieldLabel = function ($q) {
  var model = mockModel("MetadataFieldLabel", $q, dataMetadataFieldLabel1);

  return model;
};

angular.module("mock.metadataFieldLabel", []).service("MetadataFieldLabel", mockMetadataFieldLabel);
