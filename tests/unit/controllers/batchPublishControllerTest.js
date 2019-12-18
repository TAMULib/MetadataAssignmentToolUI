describe("controller: BatchPublishController", function () {
  var $q, $scope, WsApi, controller;

  var initializeVariables = function () {
    inject(function (_$q_, _WsApi_) {
      $q = _$q_;

      WsApi = _WsApi_;
    });
  };

  var initializeController = function (settings) {
    inject(function (_$controller_, _$rootScope_, _$window_, _AlertService_, _ModalService_, _ProjectRepo_, _RestApi_, _StorageService_, _WsApi_) {
      $scope = _$rootScope_.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = _$controller_("BatchPublishController", {
        $scope: $scope,
        $window: _$window_,
        AlertService: _AlertService_,
        ModalService: _ModalService_,
        RestApi: _RestApi_,
        ProjectRepo: _ProjectRepo_,
        StorageService: _StorageService_,
        WsApi: _WsApi_
      });

      // ensure that the isReady() is called.
      if (!$scope.$$phase) {
        $scope.$digest();
      }
    });
  };

  beforeEach(function () {
    module("core");
    module("metadataTool");
    module("mock.alertService");
    module("mock.document");
    module("mock.modalService");
    module("mock.project");
    module("mock.projectRepo");
    module("mock.restApi");
    module("mock.storageService");
    module("mock.wsApi");

    installPromiseMatchers();
    initializeVariables();
    initializeController();
  });

  describe("Is the controller", function () {
    var roles = [ "ROLE_ADMIN", "ROLE_MANAGER", "ROLE_USER", "ROLE_ANONYMOUS" ];
    for (var i in roles) {
      it("defined for " + roles[i], function () {
        initializeController({ role: roles[i] });
        expect(controller).toBeDefined();
      });
    }
  });

  describe("Is the scope method", function () {
    var methods = [
      "publishDocuments"
    ];

    for (var i in methods) {
      it(methods[i] + " defined", function () {
        expect($scope[methods[i]]).toBeDefined();
        expect(typeof $scope[methods[i]]).toEqual("function");
      });
    }
  });

  describe("Does the scope method", function () {
    it("publishDocuments publish a document to a project", function () {
      spyOn($scope, "closeModal");

      $scope.publishDocuments(dataProject1, dataDocument1);
      $scope.$digest();

      expect($scope.closeModal).toHaveBeenCalled();
    });
  });

});
