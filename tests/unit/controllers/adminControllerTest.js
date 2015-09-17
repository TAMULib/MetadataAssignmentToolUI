describe('controller: AdminController', function() {
	
	//$controller, $route, $scope, AssumedControl, AuthServiceApi, Metadata, StorageService, User, WsApi
	var controller, scope, User, Metadata;

	beforeEach(module('core'));

	beforeEach(module('metadataTool'));
	
	beforeEach(module('mock.user'));
	beforeEach(module('mock.metadata'));
	
	beforeEach(inject(function($controller, $rootScope, _User_, _Metadata_) {
        scope = $rootScope.$new(); 
        controller = $controller('AdminController', {
            $scope: scope,
            User: _User_,
            Metadata: _Metadata_
        });
        User = _User_;
        Metadata = _Metadata_;
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
	
	describe('Does the scope have a User', function() {
		it('User should be on the scope', function() {
			expect(scope.user).toBeDefined();
		});
	});
	
	describe('Does the User have expected credentials', function() {
		it('User should have expected credentials', function() {
			expect(scope.user).toEqual(mockUser1);
		});
	});
	
	describe('Should be able to set a User', function() {
		it('should have set the User', function() {			
			User.set(mockUser2)			
			expect(scope.user).toEqual(mockUser2);
		});
	});
	
	describe('Should be able to fetch a User', function() {		
		it('should have set the fetched User', function() {			
			User.fetch().then(function(data) {
				User.set(data);
				expect(scope.user).toEqual(mockUser3);
			});
		});		
	});	
		
});
