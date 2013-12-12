(function () {
  'use strict';

  describe('Aurea filters', function () {

    describe('Name', function () {

      // load the filter's module
      beforeEach(module('aurea'));

      // initialize a new instance of the filter before each test
      var name;
      beforeEach(inject(function ($filter) {
        name = $filter('name');
      }));

      it('should return the name well formatted', function () {
        var obj = {
          firstName: 'Jhon',
          lastName: 'Doe'
        };

        expect(name(obj)).toBe('Jhon Doe');
      });

    });

  });

})();