
describe('controller: AnnotateController', function() {
	
	var controller, scope, routeParams, Document, DocumentRepo, Metadata, User;

	beforeEach(module('metadataTool'));
	
	beforeEach(module('mock.document'));
	beforeEach(module('mock.documentRepo'));
	beforeEach(module('mock.metadata'));
	beforeEach(module('mock.user'));
	
	beforeEach(inject(function($controller, $rootScope, $routeParams, _Document_, _DocumentRepo_, _Metadata_, _User_) {
        scope = $rootScope.$new(); 
        routeParams = $routeParams;
        controller = $controller('AnnotateController', {
            $scope: scope,
            $routeParams: routeParams,
            Document: _Document_,
            DocumentRepo: _DocumentRepo_,
            Metadata: _Metadata_,
            User: _User_
        });
        Document = _Document_;
        DocumentRepo = _DocumentRepo_;
        Metadata = _Metadata_;
        User = _User_;
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
			console.log(scope.document.HashMap);
			expect(scope.document.HashMap).toEqual(mockDocument1.HashMap);
		});
	});
	
	describe('Should be able to set a Document', function() {
		it('should have set the Document', function() {			
			Document.set(mockDocument2)			
			expect(scope.document.HashMap).toEqual(mockDocument2.HashMap);
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
