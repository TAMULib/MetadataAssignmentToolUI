var dataMetadata1 = {
  id: 1,
  document: "",
  label: "Metadata 1",
  values: []
};

var dataMetadata2 = {
  id: 2,
  document: "",
  label: "Metadata 2",
  values: []
};

var dataMetadata3 = {
  id: 3,
  document: "",
  label: "Metadata 3",
  values: []
};

// Note: Metadata actually represents the model for MetadataFieldGroup.
var mockMetadata = function ($q) {
  var model = mockModel("Metadata", $q, dataMetadata1);

  return model;
};

angular.module("mock.metadata", []).service("Metadata", mockMetadata);
