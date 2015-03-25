
describe('controller: RequestsController', function() {
	
	var controller, scope, Requests;

	beforeEach(module('myLibrary'));
	
	beforeEach(module('mock.requests'));
	
	beforeEach(inject(function($controller, $rootScope, _Requests_) {
        scope = $rootScope.$new(); 
        controller = $controller('RequestsController', {
            $scope: scope,
            Requests: _Requests_
        });
        Requests = _Requests_; 
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
	
	describe('Does the scope have the Requests', function() {
		it('Requests should be on the scope', function() {
			expect(scope.requests).toBeDefined();
		});
	});
	
	describe('Does the user have expected Requests', function() {
		it('user should have expected Requests', function() {
			expect(scope.requests).toEqual(mockRequests1);
		});
	});
	
	describe('Should be able to set Requests', function() {
		it('should have set the Requests', function() {			
			Requests.set(mockRequests2)			
			expect(scope.requests).toEqual(mockRequests2);
		});
	});
	
	describe('Should be able to fetch a Requests', function() {		
		it('should have set the fetched Requests', function() {			
			Requests.fetch().then(function(data) {
				Requests.set(data);
				expect(scope.requests).toEqual(mockRequests3);
			});
		});		
	});	
	
	describe('Should be able to cancel a Request by id', function() {		
		it('should have canceled the Request', function() {			
			var requestId = 1087369;
			Requests.cancelById(requestId);			
			for(key in mockRequests1.FlatHolds.list) {
    			var request = mockRequests1.FlatHolds.list[key];
    			if(request.itemId == requestId) {
    				
    				delete mockRequests1.FlatHolds.list[key];
    				
    				break;
    			}
    		}			
			expect(scope.requests).toEqual(mockRequests1);
			
		});		
	});	
	
	describe('Should be able to cancel all Requests', function() {		
		it('should have canceled all Requests', function() {
			Requests.cancelAll();			
			for(key in mockRequests1.FlatHolds.list) {
				
				delete mockRequests1.FlatHolds.list[key];
				
			}
			expect(scope.requests).toEqual(mockRequests1);
			
		});		
	});	

});