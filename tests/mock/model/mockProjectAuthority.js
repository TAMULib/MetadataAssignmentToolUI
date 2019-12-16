var dataProjectAuthority1 = {
  id: 1,
  projects: []
};

var dataProjectAuthority2 = {
  id: 2,
  projects: []
};

var dataProjectAuthority3 = {
  id: 3,
  projects: []
};

var mockProjectAuthority = function($q) {
  var model = mockModel("ProjectAuthority", $q, dataProjectAuthority1);

  return model;
};

angular.module("mock.projectAuthority", []).service("ProjectAuthority", mockProjectAuthority);

