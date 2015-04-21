describe('model: DocumentRepo', function() {
	
	var DocumentRepo, WsApi;
	
	beforeEach(module('metadataTool'));
	
	beforeEach(module('mock.wsApi'));
	
	beforeEach(inject(function(_DocumentRepo_, _WsApi_) {
		DocumentRepo = _DocumentRepo_;
        WsApi = _WsApi_; 
    }));

	describe('model is defined', function() {
		it('should be defined', function() {
			expect(DocumentRepo).toBeDefined();
		});
	});
	
	describe('get method should return a Document', function() {
		it('the Document was returned', function() {
			expect(DocumentRepo.get().content).toEqual(mockDocumentRepo1);
		});
	});

	describe('set method should set a Document', function() {
		it('the Document was set', function() {
			var documents = DocumentRepo.get();
			DocumentRepo.set({"unwrap":function(){}, "content":mockDocumentRepo2});
			expect(documents.content).toEqual(mockDocumentRepo2);
		});
	});
	
	describe('update method should udpate a document in the DocumentRepo', function() {
		it('the document was updated in the DocumentRepo', function() {
			var docRepo = DocumentRepo.get();			
			DocumentRepo.update("disseration001.txt", "222222222");
			docRepo.content['HashMap'].annotator = "222222222";
			expect(docRepo.content).toEqual(mockDocumentRepo1);
		});
	});

});
