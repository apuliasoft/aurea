'use strict';

//School class service used for school classes REST endpoint
angular.module('aurea.schoolClasses')
    .factory('SchoolClass', function ($resource) {
        return $resource('schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId', {
            schoolClassId: '@_id',
            academicYearId: '@academicYear',
            complexId: '@complex',
            schoolId: '@school'
        }, {
            update: {
                method: 'PUT'
            }
        });
    });