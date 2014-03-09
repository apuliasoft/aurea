'use strict';

(function() {
    // Teacher Service Spec
    describe('Aurea services', function() {
        describe('Teacher', function() {

            // load the service's module
            beforeEach(module('aurea'));

            // instantiate service
            var Teacher;
            beforeEach(inject(function(_Teacher_) {
                Teacher = _Teacher_;
            }));

            it('should do something', function () {
                expect(!!Teacher).toBe(true);
            });
        });
    });
}());