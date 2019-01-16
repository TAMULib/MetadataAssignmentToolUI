describe('model: Document', function () {
    var model, rootScope, scope, WsApi, ProjectRepo;

    beforeEach(function() {
        module('core');
        module('metadataTool');
        module('mock.projectRepo');
        module('mock.wsApi');

        inject(function ($rootScope, Document, _ProjectRepo_, _WsApi_) {
            rootScope = $rootScope;
            scope = $rootScope.$new();

            WsApi = _WsApi_;
            ProjectRepo = _ProjectRepo_;

            model = angular.extend(new Document(), dataDocument1);
        });
    });

    describe('Is the model defined', function () {
        it('should be defined', function () {
            expect(model).toBeDefined();
        });
    });

    describe('Are the model methods defined', function () {
        it('getSuggestions should be defined', function () {
            expect(model.getSuggestions).toBeDefined();
            expect(typeof model.getSuggestions).toEqual("function");
        });
        it('push should be defined', function () {
            expect(model.push).toBeDefined();
            expect(typeof model.push).toEqual("function");
        });
        it('delete should be defined', function () {
            expect(model.delete).toBeDefined();
            expect(typeof model.delete).toEqual("function");
        });
        it('getProject should be defined', function () {
            expect(model.getProject).toBeDefined();
            expect(typeof model.getProject).toEqual("function");
        });
    });

    describe('Are the model methods working as expected', function () {
        it('getSuggestions should call WsApi', function () {
            spyOn(WsApi, 'fetch');
            model.getSuggestions();
            expect(WsApi.fetch).toHaveBeenCalled();
        });
        it('push should call WsApi', function () {
            spyOn(WsApi, 'fetch');
            model.push();
            expect(WsApi.fetch).toHaveBeenCalled();
        });
        it('delete should call WsApi', function () {
            spyOn(WsApi, 'fetch');
            model.delete();
            expect(WsApi.fetch).toHaveBeenCalled();
        });
        it('getProject should return the project', function () {
            var project = dataProject1;
            model.project = project.name;

            spyOn(ProjectRepo, 'findByName');

            model.getProject();
            expect(ProjectRepo.findByName).toHaveBeenCalled();
        });
    });
});
