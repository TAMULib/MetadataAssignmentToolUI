describe('model: TXT', function() {
	
	var TXT, WsApi;
	
	beforeEach(module('metadataTool'));
	
	beforeEach(module('mock.wsApi'));
	
	beforeEach(inject(function(_TXT_, _WsApi_) {
        TXT = _TXT_;
        WsApi = _WsApi_; 
    }));

	describe('model is defined', function() {
		it('should be defined', function() {
			expect(TXT).toBeDefined();
		});
	});
	
	describe('get method should return a TXT', function() {
		it('the TXT was returned', function() {
			expect(TXT.get().content).toEqual(mockTXT1);
		});
	});

	describe('set method should set a TXT', function() {
		it('the TXT was set', function() {
			var txt = TXT.get();
			TXT.set({"unwrap":function(){}, "content":mockTXT2});
			expect(txt.content).toEqual(mockTXT2);
		});
	});

});
