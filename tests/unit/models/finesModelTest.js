
describe('model: Fines', function() {
	
	var Fines, MyLibraryWsApi;
	
	beforeEach(module('myLibrary'));
	
	beforeEach(module('mock.myLibraryWsApi'));
		
	beforeEach(inject(function(_Fines_, _MyLibraryWsApi_) {
        Fines = _Fines_;
        MyLibraryWsApi = _MyLibraryWsApi_; 
    }));

	describe('model is defined', function() {
		it('should be defined', function() {
			expect(Fines).toBeDefined();
		});
	});
	
	describe('get method should return Fines', function() {
		it('the Fines were returned', function() {
			expect(Fines.get().content).toEqual(mockFines1);
		});
	});

	describe('set method should set the Fines', function() {
		it('the Fines were set', function() {
			var fines = Fines.get();
			Fines.set({"unwrap":function(){}, "content":mockFines2});
			expect(fines.content).toEqual(mockFines2);
		});
	});
	
});
