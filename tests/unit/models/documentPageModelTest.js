
describe('model: DocumentPage', function() {
	
	var DocumentPage, WsApi;
	
	beforeEach(module('metadataTool'));
	
	beforeEach(module('mock.wsApi'));
	
	beforeEach(inject(function(_DocumentPage_, _WsApi_) {
		DocumentPage = _DocumentPage_;
        WsApi = _WsApi_; 
    }));

	describe('model is defined', function() {
		it('should be defined', function() {
			expect(DocumentPage).toBeDefined();
		});
	});
	
	describe('get method should return a Document', function() {
		it('the Document was returned', function() {
			expect(DocumentPage.get(1,10,'filename','asc',{'filename':'','status':'','annotator':''}).content).toEqual(mockDocumentPage1);
		});
	});
	
});
