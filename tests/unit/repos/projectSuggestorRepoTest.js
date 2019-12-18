describe("model: ProjectSuggestorRepo", function () {
  var rootScope, scope, WsApi, repo;

  beforeEach(function () {
    module("core");
    module("metadataTool");
    module("mock.wsApi");

    inject(function ($rootScope, _WsApi_, _ProjectSuggestorRepo_) {
      rootScope = $rootScope;
      scope = $rootScope.$new();

      WsApi = _WsApi_;

      repo = _ProjectSuggestorRepo_;
    });
  });

  describe("Is the repo", function () {
    it("defined", function () {
      expect(repo).toBeDefined();
    });
  });

  describe("Is the repo method", function () {
    var methods = [
      "getTypes"
    ];

    for (var i in methods) {
      it(methods[i] + " defined", function () {
        expect(repo[methods[i]]).toBeDefined();
        expect(typeof repo[methods[i]]).toEqual("function");
      });
    }
  });

  describe("Does the repo method", function () {
    it("getTypes perform an API fetch", function () {
      spyOn(WsApi, "fetch").and.callThrough();

      repo.getTypes();
      scope.$digest();

      expect(WsApi.fetch).toHaveBeenCalled();
    });
  });
});
