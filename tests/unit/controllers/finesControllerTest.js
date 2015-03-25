
describe('controller: FinesController', function() {
	
	var controller, scope, Fines;

	beforeEach(module('myLibrary'));
	
	beforeEach(module('mock.fines'));
	
	beforeEach(inject(function($controller, $rootScope, _Fines_) {
        scope = $rootScope.$new(); 
        controller = $controller('FinesController', {
            $scope: scope,
            Fines: _Fines_
        });
        Fines = _Fines_; 
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
	
	describe('Does the scope have a Fines', function() {
		it('Fines should be on the scope', function() {
			expect(scope.fines).toBeDefined();
		});
	});
	
	describe('Does the Fines have expected credentials', function() {
		it('Fines should have expected credentials', function() {
			expect(scope.fines).toEqual(mockFines1);
		});
	});
	
	describe('Should be able to set Fines', function() {
		it('should have set the Fines', function() {			
			Fines.set(mockFines2)			
			expect(scope.fines).toEqual(mockFines2);
		});
	});
	
	describe('Should be able to fetch Fines', function() {		
		it('should have set the fetched Fines', function() {			
			Fines.fetch().then(function(data) {
				Fines.set(data);
				expect(scope.fines).toEqual(mockFines3);
			});
		});		
	});	

});