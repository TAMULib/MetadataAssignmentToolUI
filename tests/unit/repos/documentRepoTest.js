describe("model: DocumentRepo", function () {
  var rootScope, scope, Document, WsApi, repo;

  beforeEach(function () {
    module("core");
    module("metadataTool");
    module("mock.document");
    module("mock.wsApi");

    inject(function ($rootScope, _WsApi_, _Document_, _DocumentRepo_) {
      rootScope = $rootScope;
      scope = $rootScope.$new();

      Document = _Document_;

      WsApi = _WsApi_;

      repo = _DocumentRepo_;
    });
  });

  describe("Is the repo", function () {
    it("defined", function () {
      expect(repo).toBeDefined();
    });
  });

  describe("Is the repo method", function () {
    var methods = [
      "get",
      "page"
    ];

    for (var i in methods) {
      it(methods[i] + " defined", function () {
        expect(repo[methods[i]]).toBeDefined();
        expect(typeof repo[methods[i]]).toEqual("function");
      });
    }
  });

  describe("Does the repo method", function () {
    it("get work as expected", function () {
      /* TODO
      spyOn(WsApi, "fetch").and.callThrough();

      repo.get("A");
      scope.$digest();

      expect(WsApi.fetch).toHaveBeenCalled();
      */
    });

    it("page work as expected", function () {
      /* TODO
      spyOn(WsApi, "fetch").and.callThrough();

      repo.page("A", "B", "C", "D", "E");
      scope.$digest();

      expect(WsApi.fetch).toHaveBeenCalled();
      */
    });
  });
});
