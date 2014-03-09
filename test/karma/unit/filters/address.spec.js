'use strict';

(function() {
    // Address Filter Spec
    describe('Aurea filters', function() {
        describe('Address', function() {

            // load the filter's module
            beforeEach(module('aurea'));

            // initialize a new instance of the filter before each test
            var address;
            beforeEach(inject(function ($filter) {
                address = $filter('address');
            }));

            it('should return the address well formatted', function () {
                var obj = {
                    street: 'Via Qualunque 1',
                    zipCode: '12345',
                    city: 'Chissadove',
                    province: 'AZ'
                };

                expect(address(obj)).toBe('Via Qualunque 1 12345 Chissadove AZ');
            });
        });
    });
}());