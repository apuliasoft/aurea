'use strict';

(function() {
    // AcademicYear Service Spec
    describe('Aurea services', function() {
        describe('AcademicYear', function() {
            
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
}());