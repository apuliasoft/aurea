'use strict';

(function() {
    describe('AUREA controllers', function() {
        describe('HeaderCtrl', function() {
            // Load the controllers module
            beforeEach(module('aurea'));

            var scope, HeaderCtrl;

            beforeEach(inject(function($controller, $rootScope) {
                scope = $rootScope.$new();

                HeaderCtrl = $controller('HeaderCtrl', {
                    $scope: scope
                });
            }));

            it('should expose some global scope', function() {

                expect(scope.global).toBeTruthy();

            });
        });
    });
})();