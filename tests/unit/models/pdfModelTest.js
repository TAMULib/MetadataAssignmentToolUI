describe('model: PDF', function() {
	
	var PDF, WsApi;
	
	beforeEach(module('metadataTool'));
	
	beforeEach(module('mock.wsApi'));
	
	beforeEach(inject(function(_PDF_, _WsApi_) {
        PDF = _PDF_;
        WsApi = _WsApi_; 
    }));

	describe('model is defined', function() {
		it('should be defined', function() {
			expect(PDF).toBeDefined();
		});
	});
	
	describe('get method should return a PDF', function() {
		it('the PDF was returned', function() {
			expect(PDF.get().content).toEqual(mockPDF1);
		});
	});

	describe('set method should set a PDF', function() {
		it('the PDF was set', function() {
			var pdf = PDF.get();
			PDF.set({"unwrap":function(){}, "content":mockPDF2});
			expect(pdf.content).toEqual(mockPDF2);
		});
	});

});
