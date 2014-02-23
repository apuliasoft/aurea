(function () {
  'use strict';

  describe('Aurea directives', function () {

    describe('Bootstrap select directive', function () {

      // load the directive's module
      beforeEach(module('aurea'));

      var element,
        scope;

      beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
      }));

      it('should replace element with template', inject(function ($compile) {
        element = angular.element('<bsselect></bsselect>');
        element = $compile(element)(scope);
        expect(element.text()).toBe('');
      }));

    });

  });

})();