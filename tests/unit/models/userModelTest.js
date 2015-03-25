
describe('model: User', function() {
	
	var User, MyLibraryWsApi;
	
	beforeEach(module('myLibrary'));
	
	beforeEach(module('mock.myLibraryWsApi'));
	
	beforeEach(inject(function(_User_, _MyLibraryWsApi_) {
        User = _User_;
        MyLibraryWsApi = _MyLibraryWsApi_; 
    }));

	describe('model is defined', function() {
		it('should be defined', function() {
			expect(User).toBeDefined();
		});
	});
	
	describe('get method should return a User', function() {
		it('the User was returned', function() {
			expect(User.get().content).toEqual(mockUser1);
		});
	});

	describe('set method should set a User', function() {
		it('the User was set', function() {
			var user = User.get();
			User.set({"unwrap":function(){}, "content":mockUser2});
			expect(user.content).toEqual(mockUser2);
		});
	});

});
