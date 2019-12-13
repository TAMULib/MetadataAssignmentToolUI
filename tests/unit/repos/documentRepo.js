describe('model: DocumentRepo', function () {
  var rootScope, scope, Document, WsApi, repo;

  beforeEach(function() {
    module('core');
    module('metadataTool');
    module('mock.document');
    module('mock.wsApi');

    inject(function ($rootScope, _WsApi_, _Document_, _DocumentRepo_) {
      rootScope = $rootScope;
      scope = $rootScope.$new();

      Document = _Document_;

      WsApi = _WsApi_;

      repo = _DocumentRepo_;
    });
  });

  describe('Is the repo defined', function () {
    it('should be defined', function () {
      expect(repo).toBeDefined();
    });
  });

  describe('Are the repo methods defined', function () {
    it('get should be defined', function () {
      expect(repo.get).toBeDefined();
      expect(typeof repo.get).toEqual("function");
    });
    it('page should be defined', function () {
      expect(repo.page).toBeDefined();
      expect(typeof repo.page).toEqual("function");
    });
  });

  describe('Do the repo methods work as expected', function () {
    it('get should delete a user', function () {
      /* TODO
      spyOn(WsApi, 'fetch').and.callThrough();

      repo.get("A");
      scope.$digest();

      expect(WsApi.fetch).toHaveBeenCalled();
      */
    });
    it('page should delete a user', function () {
      /* TODO
      spyOn(WsApi, 'fetch').and.callThrough();

      repo.page("A", "B", "C", "D", "E");
      scope.$digest();

      expect(WsApi.fetch).toHaveBeenCalled();
      */
    });
  });
});
