describe('controller: AnnotateController', function() {
	
	var controller, scope, location, routeParams, ControlledVocabulry, DocumentRepo, Metadata, User, TXT, PDF;

	beforeEach(module('metadataTool'));
	
	beforeEach(module('mock.controlledVocabulary'));
	beforeEach(module('mock.documentRepo'));
	beforeEach(module('mock.metadata'));
	beforeEach(module('mock.user'));
	beforeEach(module('mock.txt'));
	beforeEach(module('mock.pdf'));
	
	beforeEach(module(function($provide) {
        $provide.factory('AnnotateController', function($location){
            location = $location;
        });
    }));
	
	beforeEach(inject(function($controller, $rootScope, $location, $routeParams, _ControlledVocabulary_, _DocumentRepo_, _Metadata_, _User_, _TXT_, _PDF_) {
		scope = $rootScope.$new(); 
        location = $location; 
        routeParams = $routeParams;
		controller = $controller('AnnotateController', {
        	$scope: scope,
            $location: location,
            $routeParams: routeParams,
            ControlledVocabulary: _ControlledVocabulary_,
            DocumentRepo: _DocumentRepo_,
            Metadata: _Metadata_,
            User: _User_,
            TXT: _TXT_,
            PDF: _PDF_
        });
        ControlledVocabulary = _ControlledVocabulary_;
        DocumentRepo = _DocumentRepo_;
        Metadata = _Metadata_;
        User = _User_;
        TXT = _TXT_;
        PDF = _PDF_;
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
	
	describe('Does the Document have expected data', function() {
		it('Document should have expected data', function() {
			expect(scope.document.HashMap).toEqual(mockDocumentRepo1.HashMap);
		});
	});
	
	describe('Should be able to set a Document', function() {
		it('should have set the Document', function() {			
			DocumentRepo.set(mockDocumentRepo2)			
			expect(scope.document.HashMap).toEqual(mockDocumentRepo2.HashMap);
		});
	});
	
});
