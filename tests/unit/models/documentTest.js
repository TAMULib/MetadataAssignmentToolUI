describe("model: ControlledVocabulary", function () {
  var $rootScope, $scope, ProjectRepo, WsApi, model;

  var initializeVariables = function (settings) {
    inject(function (_$rootScope_, _ProjectRepo_, _WsApi_) {
      $rootScope = _$rootScope_;

      ProjectRepo = _ProjectRepo_;
      WsApi = _WsApi_;
    });
  };

  var initializeModel = function (settings) {
    inject(function (_Document_) {
      $scope = $rootScope.$new();

      model = angular.extend(new _Document_(), dataDocument1);
    });
  };

  beforeEach(function () {
    module("core");
    module("metadataTool");
    module("mock.projectRepo");
    module("mock.wsApi");

    initializeVariables();
    initializeModel();
  });

  describe("Is the model", function () {
    it("defined", function () {
      expect(model).toBeDefined();
    });
  });

  describe("Is the model method", function () {
    var methods = [
      "getSuggestions",
      "push",
      "delete",
      "getProject"
    ];

    var modelMethodExists = function (key) {
      return function() {
        expect(model[key]).toBeDefined();
        expect(typeof model[key]).toEqual("function");
      };
    };

    for (var i in methods) {
      it(methods[i] + " defined", modelMethodExists(methods[i]));
    }
  });

  describe("Does the model method", function () {
    it("getSuggestions calls WsApi", function () {
      spyOn(WsApi, "fetch");
      model.getSuggestions();
      expect(WsApi.fetch).toHaveBeenCalled();
    });

    it("push calls WsApi", function () {
      spyOn(WsApi, "fetch");
      model.push();
      expect(WsApi.fetch).toHaveBeenCalled();
    });

    it("delete calls WsApi", function () {
      spyOn(WsApi, "fetch");
      model.delete();
      expect(WsApi.fetch).toHaveBeenCalled();
    });

    it("getProject returns the project", function () {
      var project = dataProject1;
      model.project = project.name;

      spyOn(ProjectRepo, "findByName");

      model.getProject();
      expect(ProjectRepo.findByName).toHaveBeenCalled();
    });
  });
});
