var dataProjectSettings1 = {
  id: 1,
  key: "username",
  protect: false,
  values: [
    "aggieJack@library.tamu.edu"
  ]
};

var dataProjectSettings2 = {
  id: 2,
  key: "password",
  protect: true,
  values: [
    "notactuallyencrypted==password=="
  ]
};

var dataProjectSettings3 = {
  id: 3,
  key: "collectionId",
  protect: false,
  values: [
    "2d620949-f4d4-4cee-869a-0d492314736d"
  ]
};

var mockProjectSettings = function ($q) {
  var model = mockModel("ProjectSettings", $q, dataProjectSettings1);

  return model;
};

angular.module("mock.projectSettings", []).service("ProjectSettings", mockProjectSettings);

