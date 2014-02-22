(function () {
  'use strict';

  describe('Aurea directives', function () {

    describe('Bootstrap input directive', function () {

      // load the directive's module
      beforeEach(module('aurea'));

      var element,
        scope;

      beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
      }));

      it('should replace element with template', inject(function ($compile) {
        element = angular.element('<bsinput></bsinput>');
        element = $compile(element)(scope);
        expect(element.text()).toBe('');
      }));

    });

  });

})();