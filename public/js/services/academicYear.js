'use strict';

//Academic year service used for academic years REST endpoint
angular.module('aurea.academicYears')
    .factory('AcademicYear', function ($resource) {
        return $resource('schools/:schoolId/complexes/:complexId/academicYears/:academicYearId', {
            academicYearId: '@_id',
            complexId: '@complex',
            schoolId: '@school'
        }, {
            update: {
                method: 'PUT'
            }
        });
    });