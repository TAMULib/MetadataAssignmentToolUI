
describe('controller: LoansController', function() {
	
	var controller, scope, Loans;

	beforeEach(module('myLibrary'));
	
	beforeEach(module('mock.loans'));
	
	beforeEach(inject(function($controller, $rootScope, _Loans_) {
        scope = $rootScope.$new(); 
        controller = $controller('LoansController', {
            $scope: scope,
            Loans: _Loans_
        });
        Loans = _Loans_; 
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
	
	describe('Does the scope have Loans', function() {
		it('Loans should be on the scope', function() {
			expect(scope.loans).toBeDefined();
		});
	});
	
	describe('Does the user have expected Loans', function() {
		it('user should have expected Loans', function() {
			expect(scope.loans).toEqual(mockLoans1);
		});
	});
	
	describe('Should be able to set Loans', function() {
		it('should have set the Loans', function() {			
			Loans.set(mockLoans2)			
			expect(scope.loans).toEqual(mockLoans2);
		});
	});
	
	describe('Should be able to fetch a Loans', function() {		
		it('should have set the fetched Loans', function() {			
			Loans.fetch().then(function(data) {
				Loans.set(data);
				expect(scope.loans).toEqual(mockLoans3);
			});
		});		
	});	
	
	describe('Should be able to renew a Loan by id', function() {		
		it('should have renewed the Loan', function() {			
			var loanId = 1087369;
			Loans.renew(loanId);			
			for(key in mockLoans1.FlatLoans.list) {
    			var loan = mockLoans1.FlatLoans.list[key];
    			if(loan.itemId == loanId) {
    				loanId = loan.itemId;
    				
    				if(loan.canRenew == 'Y') {
    					mockLoans1.FlatLoans.list[key].loanDueDate = mockLoans1.FlatLoans.list[key].loanDueDate + 2630000000;
    				}
    				
    				break;
    			}
    		}
			expect(scope.loans).toEqual(mockLoans1);
			
		});		
	});	
	
	describe('Should be able to renew all loans', function() {		
		it('should have renewed all loans', function() {
			Loans.renewAll();			
			for(key in mockLoans1.FlatLoans.list) {
    			var loan = mockLoans1.FlatLoans.list[key];
    			
				if(loan.canRenew == 'Y') {
					mockLoans1.FlatLoans.list[key].loanDueDate = mockLoans1.FlatLoans.list[key].loanDueDate + 2630000000;
				}
				
    		}
			expect(scope.loans).toEqual(mockLoans1);
			
		});		
	});	

});