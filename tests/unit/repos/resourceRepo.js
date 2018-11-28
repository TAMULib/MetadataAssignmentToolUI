describe('model: ResourceRepo', function () {
    var rootScope, scope, WsApi, repo;

    beforeEach(function() {
        module('core');
        module('metadataTool');
        module('mock.wsApi');

        inject(function ($rootScope, _WsApi_, _ResourceRepo_) {
            rootScope = $rootScope;
            scope = $rootScope.$new();

            WsApi = _WsApi_;

            repo = _ResourceRepo_;
        });
    });

    describe('Is the repo defined', function () {
        it('should be defined', function () {
            expect(repo).toBeDefined();
        });
    });

    describe('Are the repo methods defined', function () {
        it('getAllByProjectNameAndDocumentName should be defined', function () {
            expect(repo.getAllByProjectNameAndDocumentName).toBeDefined();
            expect(typeof repo.getAllByProjectNameAndDocumentName).toEqual("function");
        });
    });

    describe('Do the repo methods work as expected', function () {
        it('delete should perform an API fetch', function () {
            spyOn(WsApi, 'fetch').and.callThrough();

            repo.getAllByProjectNameAndDocumentName("A", "B");
            scope.$digest();

            expect(WsApi.fetch).toHaveBeenCalled();
        });
    });
});
