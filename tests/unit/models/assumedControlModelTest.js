describe('model: AssumedControl', function() {
	
	var AssumedControl;

	beforeEach(module('core'));

	beforeEach(module('metadataTool'));
	
	beforeEach(module('AssumedControl'));
			
	beforeEach(inject(function(_AssumedControl_) {
		AssumedControl = _AssumedControl_;
 
    }));

});
