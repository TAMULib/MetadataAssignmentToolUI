describe('model: Document', function() {
	
	var Document, WsApi;
	
	beforeEach(module('metadataTool'));
	
	beforeEach(module('mock.wsApi'));
	
	beforeEach(inject(function(_Document_, _WsApi_) {
		Document = _Document_;
        WsApi = _WsApi_; 
    }));

	describe('model is defined', function() {
		it('should be defined', function() {
			expect(Document).toBeDefined();
		});
	});
	
	describe('get method should return a Document', function() {
		it('the Document was returned', function() {
			expect(Document.get().content).toEqual(mockDocument1);
		});
	});

	describe('set method should set a Document', function() {
		it('the Document was set', function() {
			var document = Document.get();
			Document.set({"unwrap":function(){}, "content":mockDocument2});
			expect(document.content).toEqual(mockDocument2);
		});
	});


});
