describe('model: Metadata', function () {
  var model, rootScope, scope, WsApi;

  beforeEach(function() {
    module('core');
    module('metadataTool');
    module('mock.wsApi');

    inject(function ($rootScope, Metadata, _WsApi_) {
      rootScope = $rootScope;
      scope = $rootScope.$new();

      WsApi = _WsApi_;

      model = angular.extend(new Metadata(), dataMetadata1);
    });
  });

  describe('Is the model defined', function () {
    it('should be defined', function () {
      expect(model).toBeDefined();
    });
  });
});
