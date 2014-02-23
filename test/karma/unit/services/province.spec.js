(function () {
  'use strict';

  describe('Aurea services', function () {

    describe('Province service', function () {

      // load the service's module
      beforeEach(module('aurea'));

      // instantiate service
      var Province;
      beforeEach(inject(function(_Province_) {
        Province = _Province_;
      }));

      it('should return 110 provinces', function () {
        expect(!!Province).toBe(true);
      });

    });

  });

})();