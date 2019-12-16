describe("controller: AdminController", function () {

  var controller, q, scope;

  var initializeController = function(settings) {
    inject(function ($controller, $q, $rootScope, $route, $injector, $window, _AssumedControl_, _AuthService_, _ModalService_, _RestApi_, _StorageService_, _UserService_, _WsApi_) {
      q = $q;
      scope = $rootScope.$new();

      controller = $controller("AdminController", {
        $injector: $injector,
        $route: $route,
        $scope: scope,
        $window: $window,
        AssumedControl: _AssumedControl_,
        AuthService: _AuthService_,
        ModalService: _ModalService_,
        RestApi: _RestApi_,
        StorageService: _StorageService_,
        UserService: _UserService_,
        WsApi: _WsApi_
      });

      // ensure that the isReady() is called.
      if (!scope.$$phase) {
        scope.$digest();
      }
    });
  };

  beforeEach(function() {
    module("core");
    module("metadataTool");
    module("mock.assumedControl");
    module("mock.authService");
    module("mock.modalService");
    module("mock.restApi");
    module("mock.storageService");
    module("mock.userService");
    module("mock.wsApi");

    installPromiseMatchers();
    initializeController();
  });

  describe("Is the controller defined", function () {
    it("should be defined for admin", function () {
      initializeController({role: "ROLE_ADMIN"});
      expect(controller).toBeDefined();
    });
    it("should be defined for manager", function () {
      initializeController({role: "ROLE_MANAGER"});
      expect(controller).toBeDefined();
    });
    it("should be defined for anonymous", function () {
      initializeController({role: "ROLE_ANONYMOUS"});
      expect(controller).toBeDefined();
    });
  });

});
