describe("model: ProjectRepo", function () {
  var $q, $rootScope, $scope, WsApi, repo;

  var initializeVariables = function (settings) {
    inject(function (_$q_, _$rootScope_, _WsApi_) {
      $q = _$q_;
      $rootScope = _$rootScope_;

      WsApi = _WsApi_;
    });
  };

  var initializeRepo = function (settings) {
    inject(function ($injector, _ProjectRepo_) {
      $scope = $rootScope.$new();

      repo = _ProjectRepo_;
    });
  };

  beforeEach(function () {
    module("core");
    module("metadataTool");
    module("mock.wsApi");

    initializeVariables();
    initializeRepo();
  });

  describe("Is the repo", function () {
    it("defined", function () {
      expect(repo).toBeDefined();
    });
  });

  describe("Is the repo method", function () {
    var methods = [
      "addFieldProfile",
      "batchPublishDocuments",
      "findByName",
      "getFieldProfileLabels",
      "getIngestTypes",
      "getInputTypes",
      "syncDocuments",
      "updateFieldProfile"
    ];

    for (var i in methods) {
      it(methods[i] + " defined", function () {
        expect(repo[methods[i]]).toBeDefined();
        expect(typeof repo[methods[i]]).toEqual("function");
      });
    }
  });

  describe("Does the repo method", function () {
    it("addFieldProfile perform an API fetch", function () {
      spyOn(WsApi, "fetch").and.callThrough();

      repo.addFieldProfile(1, "A", "B");
      $scope.$digest();

      expect(WsApi.fetch).toHaveBeenCalled();
    });

    it("batchPublishDocuments perform an API fetch", function () {
      spyOn(WsApi, "fetch").and.callThrough();

      repo.batchPublishDocuments(1, 2);
      $scope.$digest();

      expect(WsApi.fetch).toHaveBeenCalled();
    });

    it("findByName load all that match", function () {
      var results;
      spyOn(repo, "getAll").and.callThrough();

      // TODO: write a test for mocked repo data and test the results.
      results = repo.findByName("A");
      $scope.$digest();

      expect(repo.getAll).toHaveBeenCalled();
    });

    it("getFieldProfileLabels perform an API fetch", function () {
      spyOn(WsApi, "fetch").and.callThrough();

      repo.getFieldProfileLabels(1);
      $scope.$digest();

      expect(WsApi.fetch).toHaveBeenCalled();
    });

    it("getIngestTypes perform an API fetch", function () {
      spyOn(WsApi, "fetch").and.callThrough();

      repo.getIngestTypes();
      $scope.$digest();

      expect(WsApi.fetch).toHaveBeenCalled();
    });

    it("getInputTypes perform an API fetch", function () {
      spyOn(WsApi, "fetch").and.callThrough();

      repo.getInputTypes();
      $scope.$digest();

      expect(WsApi.fetch).toHaveBeenCalled();
    });

    it("syncDocuments perform an API fetch", function () {
      spyOn(WsApi, "fetch").and.callThrough();

      repo.syncDocuments(1);
      $scope.$digest();

      expect(WsApi.fetch).toHaveBeenCalled();
    });

    it("updateFieldProfile perform an API fetch", function () {
      spyOn(WsApi, "fetch").and.callThrough();

      repo.updateFieldProfile(1, "A", "B");
      $scope.$digest();

      expect(WsApi.fetch).toHaveBeenCalled();
    });
  });
});
