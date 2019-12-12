describe("model: PublishingEvent", function () {
  var $rootScope, $scope, WsApi, model;

  var initializeVariables = function(settings) {
    inject(function (_$rootScope_, _WsApi_) {
      $rootScope = _$rootScope_;

      WsApi = _WsApi_;
    });
  };

  var initializeModel = function(settings) {
    inject(function (PublishingEvent) {
      $scope = $rootScope.$new();

      model = angular.extend(new PublishingEvent(), dataPublishingEvent1);
    });
  };

  beforeEach(function() {
    module("core");
    module("metadataTool");
    module("mock.wsApi");

    initializeVariables();
    initializeModel();
  });

  describe("Is the model defined", function () {
    it("should be defined", function () {
      expect(model).toBeDefined();
    });
  });

});
