'use strict';

(function() {
    // SchoolClass Service Spec
    describe('Aurea services', function() {
        describe('SchoolClass', function() {
            
            // load the service's module
            beforeEach(module('aurea'));

            // instantiate service
            var SchoolClass;
            beforeEach(inject(function(_SchoolClass_) {
                SchoolClass = _SchoolClass_;
            }));

            it('should do something', function () {
                expect(!!SchoolClass).toBe(true);
            });
        });
    });
}());