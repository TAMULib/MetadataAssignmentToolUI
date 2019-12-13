describe('controller: ProjectController', function () {

  var controller, q, scope, AlertService;

  var initializeController = function(settings) {
    inject(function ($controller, $q, $rootScope, $window, _AlertService_, _MetadataRepo_, _ModalService_, _RestApi_, _ProjectAuthorityRepo_, _ProjectRepo_, _ProjectRepositoryRepo_, _StorageService_, _ProjectSuggestorRepo_, _UserService_, _WsApi_) {
      q = $q;
      scope = $rootScope.$new();

      AlertService = _AlertService_;

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";

      controller = $controller('ProjectController', {
        $scope: scope,
        $window: $window,
        AlertService: AlertService,
        MetadataRepo: _MetadataRepo_,
        ModalService: _ModalService_,
        ProjectAuthorityRepo: _ProjectAuthorityRepo_,
        ProjectRepo: _ProjectRepo_,
        ProjectRepositoryRepo: _ProjectRepositoryRepo_,
        RestApi: _RestApi_,
        StorageService: _StorageService_,
        ProjectSuggestorRepo: _ProjectSuggestorRepo_,
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
    module('mock.alert');
    module('mock.metadataRepo');
    module('mock.modalService');
    module('mock.projectAuthorityRepo');
    module('mock.projectRepo');
    module('mock.projectRepositoryRepo');
    module('mock.restApi');
    module('mock.storageService');
    module('mock.projectSuggestorRepo');
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
    it('create should be defined', function () {
      expect(scope.create).toBeDefined();
      expect(typeof scope.create).toEqual("function");
    });
    it('delete should be defined', function () {
      expect(scope.delete).toBeDefined();
      expect(typeof scope.delete).toEqual("function");
    });
    it('onCancelFieldProfileForm should be defined', function () {
      expect(scope.onCancelFieldProfileForm).toBeDefined();
      expect(typeof scope.onCancelFieldProfileForm).toEqual("function");
    });
    it('projectHasService should be defined', function () {
      expect(scope.projectHasService).toBeDefined();
      expect(typeof scope.projectHasService).toEqual("function");
    });
    it('resetFieldProfileForm should be defined', function () {
      expect(scope.resetFieldProfileForm).toBeDefined();
      expect(typeof scope.resetFieldProfileForm).toEqual("function");
    });
    it('setFieldProfileForm should be defined', function () {
      expect(scope.setFieldProfileForm).toBeDefined();
      expect(typeof scope.setFieldProfileForm).toEqual("function");
    });
    it('syncDocuments should be defined', function () {
      expect(scope.syncDocuments).toBeDefined();
      expect(typeof scope.syncDocuments).toEqual("function");
    });
    it('update should be defined', function () {
      expect(scope.update).toBeDefined();
      expect(typeof scope.update).toEqual("function");
    });
    it('updateFieldProfile should be defined', function () {
      expect(scope.updateFieldProfile).toBeDefined();
      expect(typeof scope.updateFieldProfile).toEqual("function");
    });
  });

  describe('Do the scope methods work as expected', function () {
    it('create should create a new project', function () {
      var services = {};

      delete scope.newProject;
      delete scope.newProjectServices;

      scope.create(dataProject1, services);
      scope.$digest();

      expect(scope.newProject).toBeDefined();
      expect(scope.newProjectServices).toBeDefined();

      scope.projectServices.a = [];
      services = {a: "A"};
      delete scope.newProject;
      delete scope.newProjectServices;

      scope.create(dataProject1, services);
      scope.$digest();

      expect(scope.newProject).toBeDefined();
      expect(scope.newProjectServices).toBeDefined();
    });
    it('delete should delete an existing project', function () {
      spyOn(scope, 'resetFieldProfileForm');

      scope.delete(dataProject1);
      scope.$digest();

      expect(scope.resetFieldProfileForm).toHaveBeenCalled();
    });
    it('onCancelFieldProfileForm should clear the response', function () {
      spyOn(scope, 'resetFieldProfileForm');

      scope.onCancelFieldProfileForm();

      expect(scope.resetFieldProfileForm).toHaveBeenCalled();
    });
    it('projectHasService should return a boolean', function () {
      var response;
      var serviceType = {id: 0};

      response = scope.projectHasService(scope.projects[0], "!DoesNotExist!", 0);

      expect(response).toBe(false);

      dataProject1.ExampleServiceType = [serviceType];
      scope.projectServices.ExampleServiceType = [serviceType];

      response = scope.projectHasService(dataProject1, "ExampleServiceType", 0);

      expect(response).toBe(true);
    });
    it('resetFieldProfileForm should clear the response', function () {
      var mockedAlerts;

      AlertService.get = function() {
        return mockedAlerts;
      };

      scope.project = new mockProject(q);

      spyOn(scope, 'closeModal');
      spyOn(scope, 'setFieldProfileForm');

      scope.resetFieldProfileForm();
      expect(scope.closeModal).toHaveBeenCalled();
      expect(scope.setFieldProfileForm).toHaveBeenCalled();


      spyOn(AlertService, 'remove');

      mockedAlerts = {
        list: [
          dataAlert2,
          dataAlert3
        ]
      };

      scope.resetFieldProfileForm();
      expect(AlertService.remove).toHaveBeenCalled();
    });
    it('setFieldProfileForm should setup the profile', function () {
      var profile = {
        gloss: "Test Profile",
        id: 2345
      };

      scope.isEditing = false;
      delete scope.managingLabels;
      delete scope.managingProfile;

      scope.setFieldProfileForm(profile);
      scope.$digest();

      expect(scope.isEditing).toBe(true);
      expect(scope.managingLabels).toBeDefined();
      expect(scope.managingProfile).toBe(profile);
    });
    it('syncDocuments should sync documents', function () {
      delete scope.isSyncing;

      spyOn(scope, 'resetFieldProfileForm');

      scope.syncDocuments(scope.projects[0]);
      scope.$digest();

      expect(scope.isSyncing).toBe(false);
      expect(scope.resetFieldProfileForm).toHaveBeenCalled();

      delete scope.isSyncing;

      scope.syncDocuments(dataProject1);
      scope.$digest();

      expect(scope.isSyncing).toBe(false);
    });
    it('update should change the project', function () {
      var project = angular.copy(scope.projects[0]);
      var serviceType = {id: 0};

      project.name += " updated";
      project.dirty = function() {};

      spyOn(scope, 'resetFieldProfileForm');
      spyOn(project, 'dirty');

      scope.update(project);
      scope.$digest();

      expect(scope.resetFieldProfileForm).toHaveBeenCalled();
      expect(project.dirty).toHaveBeenCalled();

      project.dirty = function() {};
      scope.projectServices.ExampleServiceType = [serviceType];
      scope.updateableProjectServices.ExampleServiceType = [serviceType];

      spyOn(project, 'dirty');

      scope.update(project);
      scope.$digest();

      expect(project.dirty).toHaveBeenCalled();
    });
    it('updateFieldProfile should update the field profile', function () {
      var profile = {};
      var labels = [];
      var result;

      scope.projects[0].dirty = function() {};

      result = scope.updateFieldProfile(scope.projects[0].id, profile, labels);
      scope.$digest();

      scope.isEditing = true;

      q.all([
        scope.updateFieldProfile(-1, profile, labels),
        scope.updateFieldProfile(false, profile, labels),
        scope.updateFieldProfile(scope.projects[0].id, profile, labels)
      ]).then(function (results) {
      });
      scope.$digest();
    });
  });

});
