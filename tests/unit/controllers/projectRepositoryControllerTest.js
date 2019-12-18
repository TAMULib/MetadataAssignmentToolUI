describe("controller: ProjectRepositoryController", function () {
  var $q, $scope, MockedUser, WsApi, controller;

  var initializeVariables = function () {
    inject(function (_$q_, _WsApi_) {
      $q = _$q_;

      MockedUser = new mockUser($q);

      WsApi = _WsApi_;
    });
  };

  var initializeController = function (settings) {
    inject(function (_$controller_, _$rootScope_, _$window_, _ModalService_, _ProjectRepo_, _ProjectRepositoryRepo_, _RestApi_, _StorageService_, _UserService_) {
      $scope = _$rootScope_.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = _$controller_("ProjectRepositoryController", {
        $scope: $scope,
        $window: _$window_,
        ModalService: _ModalService_,
        ProjectRepo: _ProjectRepo_,
        ProjectRepositoryRepo: _ProjectRepositoryRepo_,
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
    module("mock.projectRepositoryRepo");
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
      "create",
      "delete",
      "getProjectById",
      "update"
    ];

    for (var i in methods) {
      it(methods[i] + " defined", function () {
        expect($scope[methods[i]]).toBeDefined();
        expect(typeof $scope[methods[i]]).toEqual("function");
      });
    }
  });

  describe("Do the scope methods work as expected", function () {
    it("create should create a new project repository", function () {
      var settings = {};

      delete $scope.newRepository;
      delete $scope.newRepositorySettings;

      $scope.create(dataProjectRepository1, settings);
      $scope.$digest();

      expect($scope.newRepository).toBeDefined();
      expect($scope.newRepositorySettings).toBeDefined();

      settings = {a: "A"};
      delete $scope.newRepository;
      delete $scope.newRepositorySettings;

      $scope.create(dataProjectRepository1, settings);
      $scope.$digest();

      expect($scope.newRepository).toBeDefined();
      expect($scope.newRepositorySettings).toBeDefined();
    });

    it("delete should delete a project repository", function () {
      spyOn($scope, "closeModal");

      $scope.delete(dataProjectRepository1);
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

    it("update should change the project repository", function () {
      var projectRepository = angular.copy($scope.projectRepositories[0]);

      projectRepository.name += " updated";
      projectRepository.dirty = function () {};

      spyOn($scope, "closeModal");
      spyOn(projectRepository, "dirty");

      $scope.update(projectRepository);
      $scope.$digest();

      expect($scope.closeModal).toHaveBeenCalled();
      expect(projectRepository.dirty).toHaveBeenCalled();
    });
  });

});
