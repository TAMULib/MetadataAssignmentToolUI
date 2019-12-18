describe("model: MetadataRepo", function () {
  var rootScope, scope, Metadata, WsApi, repo;

  beforeEach(function () {
    module("core");
    module("metadataTool");
    module("mock.metadata");
    module("mock.wsApi");

    inject(function ($rootScope, _WsApi_, _Metadata_, _MetadataRepo_) {
      rootScope = $rootScope;
      scope = $rootScope.$new();

      Metadata = _Metadata_;
      WsApi = _WsApi_;

      repo = _MetadataRepo_;
    });
  });

  describe("Is the repo", function () {
    it("defined", function () {
      expect(repo).toBeDefined();
    });
  });

  describe("Is the repo method", function () {
    var methods = [
      "export",
      "get",
      "getByStatus",
      "getHeaders",
      "unlockProject"
    ];

    for (var i in methods) {
      it(methods[i] + " defined", function () {
        expect(repo[methods[i]]).toBeDefined();
        expect(typeof repo[methods[i]]).toEqual("function");
      });
    }
  });

  describe("Do the repo methods work as expected", function () {
    it("export work as expected", function () {
      spyOn(WsApi, "fetch").and.callThrough();

      repo.export("A", "B");
      scope.$digest();

      expect(WsApi.fetch).toHaveBeenCalled();
    });

    it("get work as expected", function () {
      /* TODO
      spyOn(WsApi, "fetch").and.callThrough();

      repo.get("A");
      scope.$digest();

      expect(WsApi.fetch).toHaveBeenCalled();
      */
    });

    it("getByStatus work as expected", function () {
      spyOn(WsApi, "fetch").and.callThrough();

      repo.getByStatus("A");
      scope.$digest();

      expect(WsApi.fetch).toHaveBeenCalled();
    });

    it("getHeaders work as expected", function () {
      spyOn(WsApi, "fetch").and.callThrough();

      repo.getHeaders("A", "B");
      scope.$digest();

      expect(WsApi.fetch).toHaveBeenCalled();
    });

    it("unlockProject work as expected", function () {
      spyOn(WsApi, "fetch").and.callThrough();

      repo.unlockProject("A");
      scope.$digest();

      expect(WsApi.fetch).toHaveBeenCalled();
    });
  });
});
