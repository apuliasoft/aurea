(function () {
  'use strict';

  describe('Aurea services', function () {

    describe('Student service', function () {

      // load the service's module
      beforeEach(module('aurea'));

      // instantiate service
      var Student;
      beforeEach(inject(function(_Student_) {
        Student = _Student_;
      }));

      it('should do something', function () {
        expect(!!Student).toBe(true);
      });

    });

  });

})();