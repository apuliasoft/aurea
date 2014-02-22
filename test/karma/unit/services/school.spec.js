(function () {
  'use strict';

  describe('Aurea services', function () {

    describe('School service', function () {

      // load the service's module
      beforeEach(module('aurea'));

      // instantiate service
      var School;
      beforeEach(inject(function(_School_) {
        School = _School_;
      }));

      it('should do something', function () {
        expect(!!School).toBe(true);
      });

    });

  });

})();