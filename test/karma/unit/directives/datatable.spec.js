'use strict';

(function() {
    // Datatable Directive Spec
    describe('Aurea directives', function() {
        describe('Datatable', function() {

            // load the directive's module
            beforeEach(module('aurea'));

            var element,
                scope;

            beforeEach(inject(function ($rootScope) {
                scope = $rootScope.$new();
            }));

            it('should replace element with template', inject(function ($compile) {
                element = angular.element('<datatable></datatable>');
                element = $compile(element)(scope);
                expect(element.text()).toBe('');
            }));
        });
    });
}());