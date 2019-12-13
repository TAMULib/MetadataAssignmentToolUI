describe('controller: UserRepoController', function () {

  var controller, q, scope;

  var initializeController = function(settings) {
    inject(function ($controller, $q, $injector, $location, $rootScope, $route, $window, _ModalService_, _RestApi_, _StorageService_, _UserRepo_, _UserService_, _WsApi_) {
      q = $q;
      scope = $rootScope.$new();

      UserService = _UserService_;

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";

      controller = $controller('UserRepoController', {
        $route: $route,
        $scope: scope,
        $injector: $injector,
        $location: $location,
        $window: $window,
        ModalService: _ModalService_,
        RestApi: _RestApi_,
        StorageService: _StorageService_,
        UserRepo: _UserRepo_,
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
    module('core');
    module('metadataTool');
    module('mock.modalService');
    module('mock.restApi');
    module('mock.storageService');
    module('mock.userRepo');
    module('mock.userService');
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
    it('updateRole should be defined', function () {
      expect(scope.updateRole).toBeDefined();
      expect(typeof scope.updateRole).toEqual("function");
    });
    it('assignableRoles should be defined', function () {
      expect(scope.assignableRoles).toBeDefined();
      expect(typeof scope.assignableRoles).toEqual("function");
    });
    it('canDelete should be defined', function () {
      expect(scope.canDelete).toBeDefined();
      expect(typeof scope.canDelete).toEqual("function");
    });
    it('delete should be defined', function () {
      expect(scope.delete).toBeDefined();
      expect(typeof scope.delete).toEqual("function");
    });
  });

  describe('Do the scope methods work as expected', function () {
    it('updateRole should update a users role', function () {
      var originalUser2 = angular.copy(dataUser2);
      dataUser2.role = "ROLE_NEW";
      dataUser2.save = function() {};

      spyOn(dataUser2, 'save');

      scope.updateRole(dataUser2);
      scope.$digest();

      expect(dataUser2.role).not.toEqual(originalUser2.role);
      expect(dataUser2.save).toHaveBeenCalled();

      dataUser2.role = "ROLE_ANNOTATOR";
      dataUser2.save = function() {};

      spyOn(dataUser2, 'save');

      scope.updateRole(dataUser2);
      scope.$digest();

      expect(dataUser2.save).toHaveBeenCalled();

      dataUser2.role = "ROLE_USER";
      dataUser2.save = function() {};

      spyOn(dataUser2, 'save');

      scope.updateRole(dataUser2);
      scope.$digest();

      expect(dataUser2.save).toHaveBeenCalled();
    });
    it('assignableRoles should return a list of allowed roles', function () {
      var roles;

      roles = scope.assignableRoles();
      expect(roles).toBeDefined();

      initializeController({role: "ROLE_MANAGER"});

      roles = scope.assignableRoles("ROLE_ADMIN");
      expect(roles).toBeDefined();

      roles = scope.assignableRoles();
      expect(roles).toBeDefined();

      roles = scope.assignableRoles("ROLE_USER");
      expect(roles).toBeDefined();

      initializeController({role: "ROLE_USER"});
      roles = scope.assignableRoles("ROLE_ADMIN");
      expect(roles).toBeDefined();
    });
    it('canDelete should return boolean if a user can be deleted', function () {
      var canDelete;

      dataUser1.role = "ROLE_ADMIN";

      canDelete = scope.canDelete(dataUser1);
      expect(canDelete).toBe(false);

      dataUser2.role = "ROLE_ADMIN";

      canDelete = scope.canDelete(dataUser2);
      expect(canDelete).toBe(true);

      initializeController({role: "ROLE_MANAGER"});
      dataUser2.role = "ROLE_MANAGER";

      canDelete = scope.canDelete(dataUser2);
      expect(canDelete).toBe(true);

      dataUser2.role = "ROLE_ADMIN";

      canDelete = scope.canDelete(dataUser2);
      expect(canDelete).toBe(false);

      initializeController({role: "ROLE_USER"});

      canDelete = scope.canDelete(dataUser2);
      expect(canDelete).toBe(false);

      dataUser2.role = "ROLE_ADMIN";

      canDelete = scope.canDelete(dataUser2);
      expect(canDelete).toBe(false);
    });
    it('delete should delete a user', function () {
      dataUser1.delete = function() {};
      spyOn(dataUser1, 'delete');

      scope.delete(dataUser1);
      scope.$digest();

      expect(dataUser1.delete).toHaveBeenCalled();
    });
  });

});
