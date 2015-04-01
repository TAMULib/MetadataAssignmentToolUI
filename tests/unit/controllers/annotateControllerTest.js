
describe('controller: AnnotateController', function() {
	
	var controller, scope, routeParams, Document;

	beforeEach(module('metadataTool'));
	
	beforeEach(module('mock.document'));
	
	beforeEach(inject(function($controller, $rootScope, $routeParams, _Document_) {
        scope = $rootScope.$new(); 
        routeParams = $routeParams;
        controller = $controller('AnnotateController', {
            $scope: scope,
            $routeParams: routeParams,
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
			expect(scope.document).toBeDefined();
		});
	});
	
	describe('Does the Document have expected credentials', function() {
		it('Document should have expected credentials', function() {
			expect(scope.document).toEqual(mockDocument1);
		});
	});
	
	describe('Should be able to set a Document', function() {
		it('should have set the Document', function() {			
			Document.set(mockDocument2)			
			expect(scope.document).toEqual(mockDocument2);
		});
	});
	
	describe('Should be able to fetch a Document', function() {		
		it('should have set the fetched Document', function() {			
			Document.fetch().then(function(data) {
				Document.set(data);
				expect(scope.document).toEqual(mockDocument3);
			});
		});		
	});	

});
