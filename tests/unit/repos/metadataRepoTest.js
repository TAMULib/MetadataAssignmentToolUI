describe("model: MetadataRepo", function () {
  var rootScope, scope, Metadata, WsApi, repo;

  beforeEach(function() {
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

  describe("Is the repo defined", function () {
    it("should be defined", function () {
      expect(repo).toBeDefined();
    });
  });

  describe("Are the repo methods defined", function () {
    it("export should be defined", function () {
      expect(repo.export).toBeDefined();
      expect(typeof repo.export).toEqual("function");
    });
    it("get should be defined", function () {
      expect(repo.get).toBeDefined();
      expect(typeof repo.get).toEqual("function");
    });
    it("getByStatus should be defined", function () {
      expect(repo.getByStatus).toBeDefined();
      expect(typeof repo.getByStatus).toEqual("function");
    });
    it("getHeaders should be defined", function () {
      expect(repo.getHeaders).toBeDefined();
      expect(typeof repo.getHeaders).toEqual("function");
    });
    it("unlockProject should be defined", function () {
      expect(repo.unlockProject).toBeDefined();
      expect(typeof repo.unlockProject).toEqual("function");
    });
  });

  describe("Do the repo methods work as expected", function () {
    it("export should delete a user", function () {
      spyOn(WsApi, "fetch").and.callThrough();

      repo.export("A", "B");
      scope.$digest();

      expect(WsApi.fetch).toHaveBeenCalled();
    });
    it("get should delete a user", function () {
      /* TODO
      spyOn(WsApi, "fetch").and.callThrough();

      repo.get("A");
      scope.$digest();

      expect(WsApi.fetch).toHaveBeenCalled();
      */
    });
    it("getByStatus should delete a user", function () {
      spyOn(WsApi, "fetch").and.callThrough();

      repo.getByStatus("A");
      scope.$digest();

      expect(WsApi.fetch).toHaveBeenCalled();
    });
    it("getHeaders should delete a user", function () {
      spyOn(WsApi, "fetch").and.callThrough();

      repo.getHeaders("A", "B");
      scope.$digest();

      expect(WsApi.fetch).toHaveBeenCalled();
    });
    it("unlockProject should delete a user", function () {
      spyOn(WsApi, "fetch").and.callThrough();

      repo.unlockProject("A");
      scope.$digest();

      expect(WsApi.fetch).toHaveBeenCalled();
    });
  });
});
