describe("filter: cantaloupeUrl", function () {
  var $scope, filter;

  var initializeVariables = function () {
  };

  var initializeFilter = function (settings) {
    inject(function (_$filter_, _$rootScope_) {
      $scope = _$rootScope_.$new();

      filter = _$filter_("cantaloupeUrl");
    });
  };

  beforeEach(function () {
    module("core");
    module("metadataTool");

    installPromiseMatchers();
    initializeVariables();
    initializeFilter();
  });

  describe("Is the filter defined", function () {
    it("should be defined", function () {
      expect(filter).toBeDefined();
    });
  });

  describe("Does the filter work as expected", function () {
    it("should return base URL on empty input", function () {
      var result;

      result = filter("");
      expect(result).toBe(appConfig.cantaloupeService + "/info.json");
    });

    it("should return URL on valid input", function () {
      var result;
      var file = "example.txt";
      var generated = btoa(file);

      result = filter(file);
      expect(result).toBe(appConfig.cantaloupeService + generated + "/info.json");
    });
  });
});
