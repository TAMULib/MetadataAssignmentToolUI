
describe('model: UserRepo', function() {
	
	var UserRepo, WsApi;
	
	beforeEach(module('metadataTool'));
	
	beforeEach(module('mock.wsApi'));
	
	beforeEach(inject(function(_UserRepo_, _WsApi_) {
        UserRepo = _UserRepo_;
        WsApi = _WsApi_; 
    }));

	describe('model is defined', function() {
		it('should be defined', function() {
			expect(UserRepo).toBeDefined();
		});
	});
	
	describe('get method should return a UserRepo', function() {
		it('the UserRepo was returned', function() {
			expect(UserRepo.get().content).toEqual(mockUserRepo1);
		});
	});

	describe('set method should set a UserRepo', function() {
		it('the UserRepo was set', function() {
			var userRepo = UserRepo.get();
			UserRepo.set({"unwrap":function(){}, "content":mockUserRepo2});
			expect(userRepo.content).toEqual(mockUserRepo2);
		});
	});

});
