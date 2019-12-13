describe('model: ProjectRepositoryRepo', function () {
  var rootScope, scope, WsApi, repo;

  beforeEach(function() {
    module('core');
    module('metadataTool');
    module('mock.wsApi');

    inject(function ($rootScope, _WsApi_, _ProjectRepositoryRepo_) {
      rootScope = $rootScope;
      scope = $rootScope.$new();

      WsApi = _WsApi_;

      repo = _ProjectRepositoryRepo_;
    });
  });

  describe('Is the repo defined', function () {
    it('should be defined', function () {
      expect(repo).toBeDefined();
    });
  });

  describe('Are the repo methods defined', function () {
    it('getTypes should be defined', function () {
      expect(repo.getTypes).toBeDefined();
      expect(typeof repo.getTypes).toEqual("function");
    });
  });

  describe('Do the repo methods work as expected', function () {
    it('delete should perform an API fetch', function () {
      spyOn(WsApi, 'fetch').and.callThrough();

      repo.getTypes();
      scope.$digest();

      expect(WsApi.fetch).toHaveBeenCalled();
    });
  });
});
