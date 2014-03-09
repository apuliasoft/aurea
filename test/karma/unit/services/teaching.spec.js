'use strict';

(function() {
    // Teaching Service Spec
    describe('Aurea services', function() {
        describe('Teaching', function() {

            // load the service's module
            beforeEach(module('aurea'));

            // instantiate service
            var Teaching;
            beforeEach(inject(function(_Teaching_) {
                Teaching = _Teaching_;
            }));

            it('should do something', function () {
                expect(!!Teaching).toBe(true);
            });
        });
    });
}());