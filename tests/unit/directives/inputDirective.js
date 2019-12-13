describe('directive: inputDirective', function () {
  var compile, controller, directive, httpBackend, scope, templateCache;

  beforeEach(function() {
    module('core');
    module('metadataTool');

    inject(function ($compile, $httpBackend, $rootScope, $templateCache) {
      compile = $compile;
      httpBackend = $httpBackend;
      scope = $rootScope.$new();
      templateCache = $templateCache;

      httpBackend.whenGET('views/directives/input.html').respond('<input></input>');

      directive = angular.element('<metadatainput ng-model="model"></metadatainput>');
      compile(directive)(scope);
      scope.$digest();
    });
  });

  describe('Is the directive defined', function () {
    it('should be defined', function () {
      expect(directive).toBeDefined();
    });
  });
});
