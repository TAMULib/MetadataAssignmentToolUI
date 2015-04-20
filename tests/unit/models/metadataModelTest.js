describe('model: Metadata', function() {
	
	var Metadata, WsApi;
	
	beforeEach(module('metadataTool'));
	
	beforeEach(module('mock.wsApi'));
	
	beforeEach(inject(function(_Metadata_, _WsApi_) {
		Metadata = _Metadata_;
        WsApi = _WsApi_; 
    }));

	describe('model is defined', function() {
		it('should be defined', function() {
			expect(Metadata).toBeDefined();
		});
	});
	
	describe('get method should return a Metadata', function() {
		it('the Metadata was returned', function() {
			expect(Metadata.get('mockMetadata1').content).toEqual(mockMetadata1);
		});
	});

	describe('set method should set a Metadata', function() {
		it('the Metadata was set', function() {
			var metadata = Metadata.get('mockMetadata1');
			Metadata.set({"unwrap":function(){}, "content":mockMetadata2});
			expect(metadata.content).toEqual(mockMetadata2);
		});
	});


});
