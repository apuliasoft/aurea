'use strict';

(function() {
    describe('AUREA controllers', function() {
        describe('IndexCtrl', function() {
            // Load the controllers module
            beforeEach(module('aurea'));

            var scope, IndexCtrl;

            beforeEach(inject(function($controller, $rootScope) {
                scope = $rootScope.$new();

                IndexCtrl = $controller('IndexCtrl', {
                    $scope: scope
                });
            }));

            it('should expose some global scope', function() {

                expect(scope.global).toBeTruthy();

            });
        });
    });
})();