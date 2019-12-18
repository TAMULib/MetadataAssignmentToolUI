describe("model: ResourceRepo", function () {
  var rootScope, scope, WsApi, repo;

  beforeEach(function () {
    module("core");
    module("metadataTool");
    module("mock.wsApi");

    inject(function ($rootScope, _WsApi_, _ResourceRepo_) {
      rootScope = $rootScope;
      scope = $rootScope.$new();

      WsApi = _WsApi_;

      repo = _ResourceRepo_;
    });
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
      scope.$digest();

      expect(WsApi.fetch).toHaveBeenCalled();
    });
  });
});
