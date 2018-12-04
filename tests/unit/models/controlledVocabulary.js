describe('model: ControlledVocabulary', function () {
    var rootScope, scope, WsApi, model;

    beforeEach(function() {
        module('core');
        module('metadataTool');
        module('mock.wsApi');

        inject(function ($rootScope, _WsApi_, _ControlledVocabulary_) {
            rootScope = $rootScope;
            scope = $rootScope.$new();

            WsApi = _WsApi_;

            model = _ControlledVocabulary_();
        });
    });

    describe('Is the model defined', function () {
        it('should be defined', function () {
            expect(model).toBeDefined();
        });
    });
});
