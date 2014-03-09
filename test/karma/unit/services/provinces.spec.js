'use strict';

(function() {
    // Provinces Service Spec
    describe('Aurea services', function() {
        describe('Provinces', function() {
            
            // load the service's module
            beforeEach(module('aurea'));

            // instantiate service
            var Provinces;
            beforeEach(inject(function(_Provinces_) {
                Provinces = _Provinces_;
            }));

            it('should do something', function () {
                expect(!!Provinces).toBe(true);
            });
        });
    });
}());