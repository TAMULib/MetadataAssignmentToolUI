describe('model: ProjectRepo', function () {
    var rootScope, scope, WsApi, repo;

    beforeEach(function() {
        module('core');
        module('metadataTool');
        module('mock.wsApi');

        inject(function ($rootScope, _WsApi_, _ProjectRepo_) {
            rootScope = $rootScope;
            scope = $rootScope.$new();

            WsApi = _WsApi_;

            repo = _ProjectRepo_;
        });
    });

    describe('Is the repo defined', function () {
        it('should be defined', function () {
            expect(repo).toBeDefined();
        });
    });

    describe('Are the repo methods defined', function () {
        it('addFieldProfile should be defined', function () {
            expect(repo.addFieldProfile).toBeDefined();
            expect(typeof repo.addFieldProfile).toEqual("function");
        });
        it('batchPublishDocuments should be defined', function () {
            expect(repo.batchPublishDocuments).toBeDefined();
            expect(typeof repo.batchPublishDocuments).toEqual("function");
        });
        it('findByName should be defined', function () {
            expect(repo.findByName).toBeDefined();
            expect(typeof repo.findByName).toEqual("function");
        });
        it('getFieldProfileLabels should be defined', function () {
            expect(repo.getFieldProfileLabels).toBeDefined();
            expect(typeof repo.getFieldProfileLabels).toEqual("function");
        });
        it('getIngestTypes should be defined', function () {
            expect(repo.getIngestTypes).toBeDefined();
            expect(typeof repo.getIngestTypes).toEqual("function");
        });
        it('getInputTypes should be defined', function () {
            expect(repo.getInputTypes).toBeDefined();
            expect(typeof repo.getInputTypes).toEqual("function");
        });
        it('syncDocuments should be defined', function () {
            expect(repo.syncDocuments).toBeDefined();
            expect(typeof repo.syncDocuments).toEqual("function");
        });
        it('updateFieldProfile should be defined', function () {
            expect(repo.updateFieldProfile).toBeDefined();
            expect(typeof repo.updateFieldProfile).toEqual("function");
        });
    });

    describe('Do the repo methods work as expected', function () {
        it('addFieldProfile should perform an API fetch', function () {
            spyOn(WsApi, 'fetch').and.callThrough();

            repo.addFieldProfile(1, "A", "B");
            scope.$digest();

            expect(WsApi.fetch).toHaveBeenCalled();
        });
        it('batchPublishDocuments should perform an API fetch', function () {
            spyOn(WsApi, 'fetch').and.callThrough();

            repo.batchPublishDocuments(1, 2);
            scope.$digest();

            expect(WsApi.fetch).toHaveBeenCalled();
        });
        it('findByName should load all that match', function () {
            var results;
            spyOn(repo, 'getAll').and.callThrough();

            // TODO: write a test for mocked repo data and test the results.
            results = repo.findByName("A");
            scope.$digest();

            expect(repo.getAll).toHaveBeenCalled();
        });
        it('getFieldProfileLabels should perform an API fetch', function () {
            spyOn(WsApi, 'fetch').and.callThrough();

            repo.getFieldProfileLabels(1);
            scope.$digest();

            expect(WsApi.fetch).toHaveBeenCalled();
        });
        it('getIngestTypes should perform an API fetch', function () {
            spyOn(WsApi, 'fetch').and.callThrough();

            repo.getIngestTypes();
            scope.$digest();

            expect(WsApi.fetch).toHaveBeenCalled();
        });
        it('getInputTypes should perform an API fetch', function () {
            spyOn(WsApi, 'fetch').and.callThrough();

            repo.getInputTypes();
            scope.$digest();

            expect(WsApi.fetch).toHaveBeenCalled();
        });
        it('syncDocuments should perform an API fetch', function () {
            spyOn(WsApi, 'fetch').and.callThrough();

            repo.syncDocuments(1);
            scope.$digest();

            expect(WsApi.fetch).toHaveBeenCalled();
        });
        it('updateFieldProfile should perform an API fetch', function () {
            spyOn(WsApi, 'fetch').and.callThrough();

            repo.updateFieldProfile(1, "A", "B");
            scope.$digest();

            expect(WsApi.fetch).toHaveBeenCalled();
        });
    });
});
