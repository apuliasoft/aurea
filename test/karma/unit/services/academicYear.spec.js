(function () {
  'use strict';

  describe('Aurea services', function () {

    describe('AcademicYear service', function () {

      // load the service's module
      beforeEach(module('aurea'));

      // instantiate service
      var AcademicYear;
      beforeEach(inject(function(_AcademicYear_) {
        AcademicYear = _AcademicYear_;
      }));

      it('should do something', function () {
        expect(!!AcademicYear).toBe(true);
      });

    });

  });

})();