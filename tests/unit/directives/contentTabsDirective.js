describe("directive: contentTabs", function () {
  var compile, controller, directive, httpBackend, scope, templateCache;

  beforeEach(function() {
    module("core");
    module("metadataTool");

    inject(function ($compile, $httpBackend, $rootScope, $templateCache) {
      compile = $compile;
      httpBackend = $httpBackend;
      scope = $rootScope.$new();
      templateCache = $templateCache;

      httpBackend.whenGET("views/directives/contentTabs.html").respond("<div></div>");

      directive = angular.element("<contenttabs ng-model=\"model\"></contenttabs>");
      compile(directive)(scope);
      scope.$digest();
    });
  });

  describe("Is the directive defined", function () {
    it("should be defined", function () {
      expect(directive).toBeDefined();
    });
  });
});
