
describe('controller: DocumentController', function() {
	
	var controller, scope, Document;

	beforeEach(module('metadataTool'));
	
	beforeEach(module('mock.document'));
	
	beforeEach(inject(function($controller, $rootScope, _Document_) {
        scope = $rootScope.$new(); 
        controller = $controller('DocumentController', {
            $scope: scope,
            Document: _Document_
        });
        Document = _Document_; 
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
			expect(scope.documents).toEqual(mockDocument1);
		});
	});
	
	describe('Should be able to set a Document', function() {
		it('should have set the Document', function() {			
			Document.set(mockDocument2)			
			expect(scope.documents).toEqual(mockDocument2);
		});
	});
	
	describe('Should be able to fetch a Document', function() {		
		it('should have set the fetched Document', function() {			
			Document.fetch().then(function(data) {
				Document.set(data);
				expect(scope.documents).toEqual(mockDocument3);
			});
		});		
	});	

});
