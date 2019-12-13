describe('controller: NavigationController', function () {

  var controller, q, scope, window;

  var initializeController = function(settings) {
    inject(function ($controller, $location, $q, $rootScope, $window, _ModalService_, _RestApi_, _StorageService_, _WsApi_) {
      q = $q;
      scope = $rootScope.$new();
      window = $window;

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";

      controller = $controller('NavigationController', {
        $location: $location,
        $scope: scope,
        $window: $window,
        ModalService: _ModalService_,
        RestApi: _RestApi_,
        StorageService: _StorageService_,
        WsApi: _WsApi_
      });

      // ensure that the isReady() is called.
      if (!scope.$$phase) {
        scope.$digest();
      }
    });
  };

  beforeEach(function() {
    module('core');
    module('metadataTool');
    module('mock.modalService');
    module('mock.restApi');
    module('mock.storageService');
    module('mock.wsApi');

    installPromiseMatchers();
    initializeController();
  });

  describe('Is the controller defined', function () {
    it('should be defined for admin', function () {
      initializeController({role: "ROLE_ADMIN"});
      expect(controller).toBeDefined();
    });
    it('should be defined for manager', function () {
      initializeController({role: "ROLE_MANAGER"});
      expect(controller).toBeDefined();
    });
    it('should be defined for anonymous', function () {
      initializeController({role: "ROLE_ANONYMOUS"});
      expect(controller).toBeDefined();
    });
  });

  describe('Are the scope methods defined', function () {
    it('updateHeight should be defined', function () {
      expect(scope.updateHeight).toBeDefined();
      expect(typeof scope.updateHeight).toEqual("function");
    });
    it('updateWidth should be defined', function () {
      expect(scope.updateWidth).toBeDefined();
      expect(typeof scope.updateWidth).toEqual("function");
    });
  });

  describe('Do the window methods work as expected', function () {
    it('window resize should call scope resize methods', function () {
      spyOn(scope, 'updateWidth');
      spyOn(scope, 'updateHeight');

      window.onresize();

      expect(scope.updateWidth).toHaveBeenCalled();
      expect(scope.updateHeight).toHaveBeenCalled();
    });
  });

  describe('Do the $on methods work as expected', function () {
    it('$on $routeChangeStart should update the view', function () {
      delete scope.view;

      scope.$broadcast("$routeChangeStart");
      scope.$apply();

      expect(scope.view).toBeDefined();
    });
  });

});
