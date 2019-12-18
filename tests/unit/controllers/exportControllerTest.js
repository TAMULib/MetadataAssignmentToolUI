describe("controller: ExportController", function () {
  var $q, $scope, ProjectRepo, WsApi, controller;

  var initializeVariables = function () {
    inject(function (_$q_, _ProjectRepo_, _WsApi_) {
      $q = _$q_;

      ProjectRepo = _ProjectRepo_;
      WsApi = _WsApi_;
    });
  };

  var initializeController = function (settings) {
      inject(function (_$controller_, _$rootScope_, _$window_, _AlertService_, _MetadataRepo_, _ModalService_, _RestApi_, _StorageService_) {
      $scope = _$rootScope_.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = _$controller_("ExportController", {
        $scope: $scope,
        $window: _$window_,
        AlertService: _AlertService_,
        MetadataRepo: _MetadataRepo_,
        ModalService: _ModalService_,
        ProjectRepo: ProjectRepo,
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

  beforeEach(function () {
    module("core");
    module("metadataTool");
    module("mock.alertService");
    module("mock.metadataRepo");
    module("mock.modalService");
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
      "export",
      "unlock"
    ];

    for (var i in methods) {
      it(methods[i] + " defined", function () {
        expect($scope[methods[i]]).toBeDefined();
        expect(typeof $scope[methods[i]]).toEqual("function");
      });
    }
  });

  describe("Do the scope methods work as expected", function () {
    it("export should perform an export", function () {
      var response;
      var originalCloseModal = angular.copy($scope.closeModal);
      var formats = {"dspace-saf": "undefined", "dspace-csv": "object", "spotlight-csv": "object"};

      for (var format in formats) {
        $scope.closeModal = angular.copy(originalCloseModal);
        spyOn($scope, "closeModal");
        $scope.isExporting = null;

        response = $scope.export(dataProject1, format);
        $scope.$digest();

        expect($scope.closeModal).toHaveBeenCalled();
        expect($scope.isExporting).toBe(false);
        expect(typeof response).toEqual(formats[format]);
      }

      response = $scope.export(dataProject1, "!does_not_exist!");
      $scope.$digest();

      expect(typeof response).toEqual("undefined");
    });

    it("unlock should unlock the project", function () {
      spyOn(ProjectRepo, "reset");

      $scope.unlock();
      $scope.$digest();

      expect(ProjectRepo.reset).toHaveBeenCalled();
    });
  });

});
