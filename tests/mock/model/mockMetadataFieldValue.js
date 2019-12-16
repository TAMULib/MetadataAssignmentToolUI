var dataMetadataFieldValue1 = {
  id: 1,
  cv: null,
  field: {
    id: 1,
    document: "",
    label: "Metadata 1",
    values: []
  },
  value: ""
};

var dataMetadataFieldValue2 = {
  id: 2,
  cv: null,
  field: {
    id: 1,
    document: "",
    label: "Metadata 1",
    values: []
  },
  value: ""
};

var dataMetadataFieldValue3 = {
  id: 3,
  cv: null,
  field: {
    id: 1,
    document: "",
    label: "Metadata 1",
    values: []
  },
  value: ""
};

// Note: MetadataFieldValue actually represents the model for MetadataFieldValueFieldGroup.
var mockMetadataFieldValue = function($q) {
  var model = mockModel("MetadataFieldValue", $q, dataMetadataFieldValue1);

  return model;
};

angular.module("mock.metadataFieldValue", []).service("MetadataFieldValue", mockMetadataFieldValue);
