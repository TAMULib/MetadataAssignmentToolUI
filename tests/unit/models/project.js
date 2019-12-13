describe('model: Project', function () {
  var model, rootScope, scope, WsApi;

  beforeEach(function() {
    module('core');
    module('metadataTool');
    module('mock.wsApi');

    inject(function ($rootScope, Project, _WsApi_) {
      rootScope = $rootScope;
      scope = $rootScope.$new();

      WsApi = _WsApi_;

      model = angular.extend(new Project(), dataProject1);
    });
  });

  describe('Is the model defined', function () {
    it('should be defined', function () {
      expect(model).toBeDefined();
    });
  });
});
