describe('model: ControlledVocabulary', function() {
	
	var ControlledVocabulary, WsApi;
	
	beforeEach(module('metadataTool'));
	
	beforeEach(module('mock.wsApi'));
	
	beforeEach(inject(function(_ControlledVocabulary_, _WsApi_) {
        ControlledVocabulary = _ControlledVocabulary_;
        WsApi = _WsApi_; 
    }));

	describe('model is defined', function() {
		it('should be defined', function() {
			expect(ControlledVocabulary).toBeDefined();
		});
	});
	
	describe('get method should return a ControlledVocabulary', function() {
		it('the ControlledVocabulary was returned', function() {
			expect(ControlledVocabulary.get().content).toEqual(mockControlledVocabulary1);
		});
	});

	describe('set method should set a ControlledVocabulary', function() {
		it('the ControlledVocabulary was set', function() {
			var cv = ControlledVocabulary.get();
			ControlledVocabulary.set({"unwrap":function(){}, "content":mockControlledVocabulary2});
			expect(cv.content).toEqual(mockControlledVocabulary2);
		});
	});

});
