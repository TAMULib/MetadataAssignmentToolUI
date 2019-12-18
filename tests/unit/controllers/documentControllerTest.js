describe("controller: DocumentController", function () {
  var $q, $scope, ApiResponseActions, MockedDocument, MockedNgTableParams, MockedUser, WsApi, controller;

  var initializeVariables = function () {
    inject(function (_$q_, _WsApi_) {
      $q = _$q_;

      MockedDocument = new mockDocument($q);
      MockedNgTableParams = new mockNgTableParams($q);
      MockedUser = new mockUser($q);

      // TODO: this should be in its own mock file as a mocked constant.
      ApiResponseActions = {
        CREATE: "CREATE",
        READ: "READ",
        UPDATE: "UPDATE",
        DELETE: "DELETE",
        REORDER: "REORDER",
        REMOVE: "REMOVE",
        SORT: "SORT",
        BROADCAST: "BROADCAST",
        CHANGE: "CHANGE",
        ANY: "ANY"
      };

      WsApi = _WsApi_;
    });
  };

  var initializeController = function (settings) {
    inject(function (_$controller_, _$location_, _$rootScope_, _$route_, _$routeParams_, _$window_, _AlertService_, _Document_, _DocumentRepo_, _ModalService_, _NgTableParams_, _ProjectRepo_, _RestApi_, _StorageService_, _UserRepo_, _UserService_) {
      $scope = _$rootScope_.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = _$controller_("DocumentController", {
        $route: _$route_,
        $routeParams: _$routeParams_,
        $scope: $scope,
        $location: _$location_,
        $window: _$window_,
        AlertService: _AlertService_,
        ApiResponseActions: ApiResponseActions,
        Document: _Document_,
        DocumentRepo: _DocumentRepo_,
        ModalService: _ModalService_,
        NgTableParams: _NgTableParams_,
        ProjectRepo: _ProjectRepo_,
        RestApi: _RestApi_,
        StorageService: _StorageService_,
        UserRepo: _UserRepo_,
        UserService: _UserService_,
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
    module("mock.document", function ($provide) {
      var Document = function () {
        return MockedDocument;
      };
      $provide.value("Document", Document);
    });
    module("mock.documentRepo");
    module("mock.modalService");
    module("mock.ngTableParams", function ($provide) {
      var NgTableParams = function () {
        return MockedNgTableParams;
      };
      $provide.value("NgTableParams", NgTableParams);
    });
    module("mock.projectRepo");
    module("mock.restApi");
    module("mock.storageService");
    module("mock.user", function ($provide) {
      var User = function () {
        return MockedUser;
      };
      $provide.value("User", User);
    });
    module("mock.userRepo");
    module("mock.userService");
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
    it("availableAnnotators should be defined", function () {
      expect($scope.availableAnnotators).toBeDefined();
      expect(typeof $scope.availableAnnotators).toEqual("function");
    });

    it("setSelectedUser should be defined", function () {
      expect($scope.setSelectedUser).toBeDefined();
      expect(typeof $scope.setSelectedUser).toEqual("function");
    });

    it("setTable should be defined", function () {
      expect($scope.setTable).toBeDefined();
      expect(typeof $scope.setTable).toEqual("function");
    });

    it("togglePublished should be defined", function () {
      expect($scope.togglePublished).toBeDefined();
      expect(typeof $scope.togglePublished).toEqual("function");
    });

    it("toggleProjectsFilter should be defined", function () {
      expect($scope.toggleProjectsFilter).toBeDefined();
      expect(typeof $scope.toggleProjectsFilter).toEqual("function");
    });

    it("update should be defined", function () {
      expect($scope.update).toBeDefined();
      expect(typeof $scope.update).toEqual("function");
    });

    it("updateTable should be defined", function () {
      expect($scope.updateTable).toBeDefined();
      expect(typeof $scope.updateTable).toEqual("function");
    });
  });

  describe("Do the scope methods work as expected", function () {
    it("availableAnnotators should return an array list", function () {
      var response = $scope.availableAnnotators();

      expect(typeof response).toEqual("object");
    });

    it("setSelectedUser should assign the selected user", function () {
      var user = new mockUser($q);
      $scope.selectedUser = null;

      $scope.setSelectedUser(user);

      expect($scope.selectedUser).toEqual(user);
    });

    it("setTable should setup the table", function () {
      $scope.tableParams = null;
      $scope.setTable();

      expect($scope.tableParams).toBeDefined();
    });

    it("togglePublished should toggle the showPublished boolean", function () {
      $scope.showPublished = false;
      $scope.setTable();

      spyOn($scope.tableParams, "reload");

      $scope.togglePublished();

      expect($scope.showPublished).toBe(true);
      expect($scope.tableParams.reload).toHaveBeenCalled();

      $scope.togglePublished();
      expect($scope.showPublished).toBe(false);
    });

    it("toggleProjectsFilter should toggle the showProjectsFilter boolean", function () {
      $scope.showProjectsFilter = false;

      $scope.toggleProjectsFilter();
      expect($scope.showProjectsFilter).toBe(true);

      $scope.toggleProjectsFilter();
      expect($scope.showProjectsFilter).toBe(false);
    });

    it("update should update the document status", function () {
      var document = new mockDocument($q);
      document.status = "";

      spyOn(document, "save");

      $scope.update(document, "Open");

      expect(document.status).toEqual("Open");
      expect(document.annotator).not.toBeDefined();
      expect(document.save).toHaveBeenCalled();

      $scope.update(document, "Closed");
      expect(document.status).toEqual("Closed");
      expect(document.annotator).toEqual($scope.user.firstName + " " + $scope.user.lastName);

      $scope.update(document, "Other");
      expect(document.status).toEqual("Other");
    });

    it("updateTable should reload the table", function () {
      $scope.setTable();
      $scope.tableNeedsUpdating = true;

      spyOn($scope.tableParams, "reload");

      $scope.updateTable();

      expect($scope.tableNeedsUpdating).toBe(false);
      expect($scope.tableParams.reload).toHaveBeenCalled();
    });
  });

});
