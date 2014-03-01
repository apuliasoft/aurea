(function () {
  'use strict';

  describe('Aurea services', function () {

    describe('SchoolClass service', function () {

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

})();