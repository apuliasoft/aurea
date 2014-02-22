(function () {
  'use strict';

  describe('Aurea filters', function () {

    describe('Address filter', function () {

      // load the filter's module
      beforeEach(module('aurea'));

      // initialize a new instance of the filter before each test
      var address;
      beforeEach(inject(function ($filter) {
        address = $filter('address');
      }));

      it('should return the address well formatted', function () {
        var obj = {
          address: 'via Manzoni s.n.',
          zipCode: '70016',
          city: 'Noicattaro',
          province: 'BA'
        };

        expect(address(obj)).toBe('via Manzoni s.n. 70016 Noicattaro BA');
      });

    });

  });

})();