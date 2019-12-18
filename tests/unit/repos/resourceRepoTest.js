describe("model: ResourceRepo", function () {
  var $q, $rootScope, $scope, WsApi, repo;

  var initializeVariables = function (settings) {
    inject(function (_$q_, _$rootScope_, _WsApi_) {
      $q = _$q_;
      $rootScope = _$rootScope_;

      WsApi = _WsApi_;
    });
  };

  var initializeRepo = function (settings) {
    inject(function ($injector, _ResourceRepo_) {
      $scope = $rootScope.$new();

      repo = _ResourceRepo_;
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
      "getAllByProjectNameAndDocumentName"
    ];

    for (var i in methods) {
      it(methods[i] + " defined", function () {
        expect(repo[methods[i]]).toBeDefined();
        expect(typeof repo[methods[i]]).toEqual("function");
      });
    }
  });

  describe("Do the repo method", function () {
    it("getAllByProjectNameAndDocumentName perform an API fetch", function () {
      spyOn(WsApi, "fetch").and.callThrough();

      repo.getAllByProjectNameAndDocumentName("A", "B");
      $scope.$digest();

      expect(WsApi.fetch).toHaveBeenCalled();
    });
  });
});
