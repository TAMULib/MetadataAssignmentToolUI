describe('controller: DocumentController', function() {
	
	var controller, scope, DocumentPage, DocumentRepo, User, UserRepo;

	beforeEach(module('metadataTool'));
	
	beforeEach(module('mock.documentPage'));
	beforeEach(module('mock.documentRepo'));
	beforeEach(module('mock.user'));
	beforeEach(module('mock.userRepo'));
	
	beforeEach(module('ngTable'));
		
	beforeEach(inject(function($controller, $rootScope, _DocumentPage_, _DocumentRepo_, _User_, _UserRepo_) {        
		scope = $rootScope.$new();       
		controller = $controller('DocumentController', {
            $scope: scope,
            DocumentPage: _DocumentPage_,
            DocumentRepo: _DocumentRepo_,
            User: _User_,
            UserRepo: _UserRepo_
        });
        DocumentRepo = _DocumentRepo_; 
        DocumentPage = _DocumentPage_;
        User = _User_;
        UserRepo = _UserRepo_;
        scope.tableParams.settings().$scope = scope;
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

});
