describe('directive: formatDirective', function () {
  var compile, controller, directive, httpBackend, scope, templateCache;

  beforeEach(function() {
    module('core');
    module('metadataTool');

    inject(function ($compile, $httpBackend, $rootScope, $templateCache) {
      compile = $compile;
      httpBackend = $httpBackend;
      scope = $rootScope.$new();
      templateCache = $templateCache;

      directive = angular.element('<format ng-model="model"></format>');
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
