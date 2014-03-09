'use strict';

(function() {
    // School Service Spec
    describe('Aurea services', function() {
        describe('School', function() {
            
            // load the service's module
            beforeEach(module('aurea'));

            // instantiate service
            var School;
            beforeEach(inject(function(_School_) {
                School = _School_;
            }));

            it('should do something', function () {
                expect(!!School).toBe(true);
            });
        });
    });
}());