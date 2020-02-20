var dataProjectRepository1 = {
  id: 1,
  projects: [],
  type: "FEDORA_PCDM",
  settings: [
    {
      key: "repoUrl",
      values: ["localhost-repo1"]
    },
    {
      key: "restPath",
      values: ["rest"]
    }
  ]
};

var dataProjectRepository2 = {
  id: 2,
  projects: [],
  type: "DSPACE",
  settings: [
    {
      key: "repoUrl",
      values: ["localhost-repo2"]
    },
    {
      key: "repoContextPath",
      values: ["rest"]
    }
  ]
};

var dataProjectRepository3 = {
  id: 3,
  projects: [],
  type: "DSPACE",
  settings: [
    {
      key: "repoUrl",
      values: ["localhost-repo3"]
    },
    {
      key: "repoContextPath",
      values: ["rest"]
    }
  ]
};

var mockProjectRepository = function ($q) {
  var model = mockModel("ProjectRepository", $q, dataProjectRepository1);

  return model;
};

angular.module("mock.projectRepository", []).service("ProjectRepository", mockProjectRepository);

