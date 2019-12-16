describe("controller: NavigationController", function () {
  var $q, $scope, $window, WsApi, controller;

  var initializeVariables = function() {
    inject(function (_$q_, _$window_, _WsApi_) {
      $q = _$q_;
      $window = _$window_;

      WsApi = _WsApi_;
    });
  };

  var initializeController = function(settings) {
    inject(function (_$controller_, _$location_, _$rootScope_, _ModalService_, _RestApi_, _StorageService_) {
      $scope = _$rootScope_.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = _$controller_("NavigationController", {
        $location: _$location_,
        $scope: $scope,
        $window: $window,
        ModalService: _ModalService_,
        RestApi: _RestApi_,
        StorageService: _StorageService_,
        WsApi: WsApi
      });

      // ensure that the isReady() is called.
      if (!$scope.$$phase) {
        $scope.$digest();
      }
    });
  };

  beforeEach(function() {
    module("core");
    module("metadataTool");
    module("mock.modalService");
    module("mock.restApi");
    module("mock.storageService");
    module("mock.wsApi");

    installPromiseMatchers();
    initializeVariables();
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

  describe("Are the scope methods defined", function () {
    it("updateHeight should be defined", function () {
      expect($scope.updateHeight).toBeDefined();
      expect(typeof $scope.updateHeight).toEqual("function");
    });

    it("updateWidth should be defined", function () {
      expect($scope.updateWidth).toBeDefined();
      expect(typeof $scope.updateWidth).toEqual("function");
    });
  });

  describe("Do the window methods work as expected", function () {
    it("window resize should call scope resize methods", function () {
      spyOn($scope, "updateWidth");
      spyOn($scope, "updateHeight");

      $window.onresize();

      expect($scope.updateWidth).toHaveBeenCalled();
      expect($scope.updateHeight).toHaveBeenCalled();
    });
  });

  describe("Do the $on methods work as expected", function () {
    it("$on $routeChangeStart should update the view", function () {
      delete $scope.view;

      $scope.$broadcast("$routeChangeStart");
      $scope.$apply();

      expect($scope.view).toBeDefined();
    });
  });

});
