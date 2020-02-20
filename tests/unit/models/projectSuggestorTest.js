describe("model: ProjectSuggestor", function () {
  var $rootScope, $scope, WsApi, model;

  var initializeVariables = function (settings) {
    inject(function (_$rootScope_, _WsApi_) {
      $rootScope = _$rootScope_;

      WsApi = _WsApi_;
    });
  };

  var initializeModel = function (settings) {
    inject(function (_ProjectSuggestor_) {
      $scope = $rootScope.$new();

      model = angular.extend(new _ProjectSuggestor_(), dataProjectSuggestor1);
    });
  };

  beforeEach(function () {
    module("core");
    module("metadataTool");
    module("mock.wsApi");

    initializeVariables();
    initializeModel();
  });

  describe("Is the model", function () {
    it("defined", function () {
      expect(model).toBeDefined();
    });
  });
});
