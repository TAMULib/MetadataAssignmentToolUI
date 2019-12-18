describe("model: ControlledVocabularyRepo", function () {
  var rootScope, scope, WsApi, repo;

  beforeEach(function () {
    module("core");
    module("metadataTool");
    module("mock.wsApi");

    inject(function ($rootScope, _WsApi_, _ControlledVocabularyRepo_) {
      rootScope = $rootScope;
      scope = $rootScope.$new();

      WsApi = _WsApi_;

      repo = _ControlledVocabularyRepo_;
    });
  });

  describe("Is the repo defined", function () {
    it("should be defined", function () {
      expect(repo).toBeDefined();
    });
  });
});
