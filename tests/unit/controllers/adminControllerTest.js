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
			var userOnScope = angular.toJson(scope.user);
			var mockUser = angular.toJson(mockUser1);
			expect(userOnScope).toEqual(mockUser);
		});
	});
	
	describe('Should be able to set a User', function() {
		it('should have set the User', function() {			
			User.set(mockUser2)			
			var userOnScope = angular.toJson(scope.user);
			var mockUser = angular.toJson(mockUser2);
			expect(userOnScope).toEqual(mockUser);
		});
	});
	
	describe('Should be able to fetch a User', function() {		
		it('should have set the fetched User', function() {			
			User.fetch().then(function(data) {
				User.set(data);
				var userOnScope = angular.toJson(scope.user);
				var mockUser = angular.toJson(mockUser3);
				expect(userOnScope).toEqual(mockUser);
			});
		});		
	});	
		
});
