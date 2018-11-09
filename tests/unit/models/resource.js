describe('model: Resource', function () {
    var rootScope, scope, WsApi, model;

    beforeEach(function() {
        module('core');
        module('metadataTool');
        module('mock.wsApi');

        inject(function ($rootScope, _WsApi_, _Resource_) {
            rootScope = $rootScope;
            scope = $rootScope.$new();

            WsApi = _WsApi_;

            model = _Resource_;
        });
    });

    describe('Is the model defined', function () {
        it('should be defined', function () {
            expect(model).toBeDefined();
        });
    });
});
