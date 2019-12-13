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

var dataMetadata4 = {
  id: 4,
  document: "",
  label: "Metadata 004",
  values: []
};

var dataMetadata5 = {
  id: 5,
  document: "",
  label: "Metadata 005",
  values: []
};

var dataMetadata6 = {
  id: 6,
  document: "",
  label: "Metadata 006",
  values: []
};

var mockMetadata = function($q) {
  var model = mockModel("Metadata", $q, dataMetadata1);

  return model;
};

angular.module('mock.metadata', []).service('Metadata', mockMetadata);
