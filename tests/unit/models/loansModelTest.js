
describe('model: Loans', function() {
	
	var Loans, MyLibraryWsApi;
	
	beforeEach(module('myLibrary'));
	
	beforeEach(module('mock.myLibraryWsApi'));
		
	beforeEach(inject(function(_Loans_, _MyLibraryWsApi_) {
        Loans = _Loans_;
        MyLibraryWsApi = _MyLibraryWsApi_; 
    }));

	describe('model is defined', function() {
		it('should be defined', function() {
			expect(Loans).toBeDefined();
		});
	});
	
	describe('get method should return Loans', function() {
		it('the Loans were returned', function() {
			expect(Loans.get().content).toEqual(mockLoans1);
		});
	});

	describe('set method should set Loans', function() {
		it('the Loans were set', function() {
			var loans = Loans.get();
			Loans.set({"unwrap":function(){}, "content":mockLoans2});
			expect(loans.content).toEqual(mockLoans2);
		});
	});
	
	describe('renewLoanById should renew a Loan by id', function() {
		it('loan with specified id was renewed', function() {

			var loans = Loans.get().content;

			var loanId = 1087369;
			Loans.renewLoanById(loanId, "http://127.0.0.1:7014/vxws/patron/437281/circulationActions/loans/1@AMDB20020820112825|1087369?patron_homedb=1@AMDB20020820112825");

			var renewedLoan = Loans.get().content;

			for(key in loans.FlatLoans.list) {
    			var loan = loans.FlatLoans.list[key];
    			if(loan.itemId == loanId) {
    				loanId = loan.itemId;
    				
    				if(loan.canRenew == 'Y') {
    					loans.FlatLoans.list[key].loanDueDate = loans.FlatLoans.list[key].loanDueDate + 2630000000;
    				}
    				
    				break;
    			}
    		}
			
			expect(loans).toEqual(renewedLoan);
		});
	});

});
