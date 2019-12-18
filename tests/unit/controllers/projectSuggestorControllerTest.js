describe("controller: ProjectSuggestorController", function () {
  var $q, $scope, MockedUser, WsApi, controller;

  var initializeVariables = function () {
    inject(function (_$q_, _WsApi_) {
      $q = _$q_;

      MockedUser = new mockUser($q);

      WsApi = _WsApi_;
    });
  };

  var initializeController = function (settings) {
    inject(function (_$controller_, _$rootScope_, _$window_, _ModalService_, _ProjectRepo_, _ProjectSuggestorRepo_, _RestApi_, _StorageService_, _UserService_) {
      $scope = _$rootScope_.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = _$controller_("ProjectSuggestorController", {
        $scope: $scope,
        $window: _$window_,
        ModalService: _ModalService_,
        ProjectRepo: _ProjectRepo_,
        ProjectSuggestorRepo: _ProjectSuggestorRepo_,
        RestApi: _RestApi_,
        StorageService: _StorageService_,
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
    module("mock.modalService");
    module("mock.restApi");
    module("mock.projectRepo");
    module("mock.projectSuggestorRepo");
    module("mock.storageService");
    module("mock.user", function ($provide) {
      var User = function () {
        return MockedUser;
      };
      $provide.value("User", User);
    });
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
    it("create should be defined", function () {
      expect($scope.create).toBeDefined();
      expect(typeof $scope.create).toEqual("function");
    });

    it("delete should be defined", function () {
      expect($scope.delete).toBeDefined();
      expect(typeof $scope.delete).toEqual("function");
    });

    it("getProjectById should be defined", function () {
      expect($scope.getProjectById).toBeDefined();
      expect(typeof $scope.getProjectById).toEqual("function");
    });

    it("update should be defined", function () {
      expect($scope.update).toBeDefined();
      expect(typeof $scope.update).toEqual("function");
    });
  });

  describe("Do the scope methods work as expected", function () {
    it("create should create a new project suggestor", function () {
      var settings = {};

      delete $scope.newSuggestor;
      delete $scope.newSuggestorSettings;

      $scope.create(dataProjectSuggestor1, settings);
      $scope.$digest();

      expect($scope.newSuggestor).toBeDefined();
      expect($scope.newSuggestorSettings).toBeDefined();

      settings = {a: "A"};
      delete $scope.newSuggestor;
      delete $scope.newSuggestorSettings;

      $scope.create(dataProjectSuggestor1, settings);
      $scope.$digest();

      expect($scope.newSuggestor).toBeDefined();
      expect($scope.newSuggestorSettings).toBeDefined();
    });

    it("delete should delete a project suggestor", function () {
      spyOn($scope, "closeModal");

      $scope.delete(dataProjectSuggestor1);
      $scope.$digest();

      expect($scope.closeModal).toHaveBeenCalled();
    });

    it("getProjectById should return a project", function () {
      var project;

      project = $scope.getProjectById($scope.projects[0].id);
      $scope.$digest();

      expect(project).toBeDefined();

      project = $scope.getProjectById(-1);
      $scope.$digest();

      expect(project).toBe(null);
    });

    it("update should change the project suggestor", function () {
      var projectSuggestor = angular.copy($scope.projectSuggestors[0]);

      projectSuggestor.name += " updated";
      projectSuggestor.dirty = function () {};

      spyOn($scope, "closeModal");
      spyOn(projectSuggestor, "dirty");

      $scope.update(projectSuggestor);
      $scope.$digest();

      expect($scope.closeModal).toHaveBeenCalled();
      expect(projectSuggestor.dirty).toHaveBeenCalled();
    });
  });

});
