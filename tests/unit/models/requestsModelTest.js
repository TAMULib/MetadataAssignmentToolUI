
describe('model: Requests', function() {
	
	var Requests, MyLibraryWsApi;
	
	beforeEach(module('myLibrary'));
	
	beforeEach(module('mock.myLibraryWsApi'));
	
	beforeEach(inject(function(_Requests_, _MyLibraryWsApi_) {
		Requests = _Requests_;
        MyLibraryWsApi = _MyLibraryWsApi_; 
    }));

	describe('model is defined', function() {
		it('should be defined', function() {
			expect(Requests).toBeDefined();
		});
	});
	
	describe('get method should return Requests', function() {
		it('the Requests was returned', function() {
			expect(Requests.get().content).toEqual(mockRequests1);
		});
	});

	describe('set method should set Requests', function() {
		it('the Requests was set', function() {
			var requests = Requests.get();
			Requests.set({"unwrap":function(){}, "content":mockRequests2});
			expect(requests.content).toEqual(mockRequests2);
		});
	});
	
	describe('cancelById method works', function() {
		it('the Request was canceled', function() {
			
			var requests = Requests.get();
			
			Requests.cancelById(4, "http://voyager.tamu.edu/request/12345");
			
			var changedRequests = Requests.get()
			
			for(var key in requests)
			{
				if(requests[key].itemId == 4)
				{
					delete requests[key];
					break;
				}
			}
			
			expect(requests).toEqual(changedRequests);
		});
	});	
});
