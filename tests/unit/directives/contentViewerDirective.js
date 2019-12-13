describe("directive: inputDirective", function () {
  var compile, controller, directive, httpBackend, scope, templateCache;

  beforeEach(function() {
    module("core");
    module("metadataTool");

    inject(function ($compile, $httpBackend, $rootScope, $templateCache) {
      compile = $compile;
      httpBackend = $httpBackend;
      scope = $rootScope.$new();
      templateCache = $templateCache;

      for (var i in ["default", "image", "pdf", "seadragon", "text"] ) {
        httpBackend.whenGET("views/directives/viewers/" + i + "Viewer.html").respond("<div></div>");
      }

      directive = angular.element("<contentviewer ng-model=\"model\"></contentviewer>");
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
