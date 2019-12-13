var dataMetadata1 = {
  id: 1,
  document: "",
  label: "Metadata 001",
  values: []
};

var dataMetadata2 = {
  id: 2,
  document: "",
  label: "Metadata 002",
  values: []
};

var dataMetadata3 = {
  id: 3,
  document: "",
  label: "Metadata 003",
  values: []
};

var mockMetadata = function($q) {
  var model = mockModel("Metadata", $q, dataMetadata1);

  return model;
};

angular.module("mock.metadata", []).service("Metadata", mockMetadata);
