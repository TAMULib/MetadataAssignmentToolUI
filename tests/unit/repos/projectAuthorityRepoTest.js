describe("model: ProjectAuthorityRepo", function () {
  var rootScope, scope, WsApi, repo;

  beforeEach(function () {
    module("core");
    module("metadataTool");
    module("mock.wsApi");

    inject(function ($rootScope, _WsApi_, _ProjectAuthorityRepo_) {
      rootScope = $rootScope;
      scope = $rootScope.$new();

      WsApi = _WsApi_;

      repo = _ProjectAuthorityRepo_;
    });
  });

  describe("Is the repo defined", function () {
    it("should be defined", function () {
      expect(repo).toBeDefined();
    });
  });

  describe("Are the repo methods defined", function () {
    it("uploadCsv should be defined", function () {
      expect(repo.uploadCsv).toBeDefined();
      expect(typeof repo.uploadCsv).toEqual("function");
    });
  });

  describe("Do the repo methods work as expected", function () {
    it("delete should uploadCsv a user", function () {
      /* TODO
      var file = { name: "a" };
      spyOn(WsApi, "fetch").and.callThrough();

      repo.uploadCsv(file);
      scope.$digest();

      expect(WsApi.fetch).toHaveBeenCalled();
      */
    });
  });
});
