'use strict';

//Teaching service used for teachings REST endpoint
angular.module('aurea.teachings')
    .factory('Teaching', function ($resource) {
        return $resource('schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/teachings/:teachingId', {
            teachingId: '@_id',
            schoolClassId: '@schoolClass',
            academicYearId: '@academicYear',
            complexId: '@complex',
            schoolId: '@school'
        }, {
            update: {
                method: 'PUT'
            }
        });
    });