
describe('controller: DocumentController', function() {
	
	var controller, scope, DocumentRepo;

	beforeEach(module('metadataTool'));
	
	beforeEach(module('mock.documentRepo'));
	
	beforeEach(inject(function($controller, $rootScope, _DocumentRepo_) {
        scope = $rootScope.$new(); 
        controller = $controller('DocumentController', {
            $scope: scope,
            DocumentRepo: _DocumentRepo_
        });
        DocumentRepo = _DocumentRepo_; 
    }));

	describe('Is the controller defined', function() {
		it('should be defined', function() {
			expect(controller).toBeDefined();
		});
	});
	
	describe('Is the scope defined', function() {
		it('should be defined', function() {
			expect(scope).toBeDefined();
		});
	});
	
	describe('Does the scope have a Document', function() {
		it('Document should be on the scope', function() {
			expect(scope.documents).toBeDefined();
		});
	});
	
	describe('Does the Document have expected credentials', function() {
		it('Document should have expected credentials', function() {
			expect(scope.documents).toEqual(mockDocumentRepo1);
		});
	});
	
	describe('Should be able to set a Document', function() {
		it('should have set the Document', function() {			
			DocumentRepo.set(mockDocumentRepo2)			
			expect(scope.documents).toEqual(mockDocumentRepo2);
		});
	});
	
	describe('Should be able to fetch a Document', function() {		
		it('should have set the fetched Document', function() {			
			DocumentRepo.fetch().then(function(data) {
				DocumentRepo.set(data);
				expect(scope.documents).toEqual(mockDocumentRepo3);
			});
		});		
	});	

});
