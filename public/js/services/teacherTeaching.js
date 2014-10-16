'use strict';

//Teaching service used for teachings REST endpoint
angular.module('aurea.teachings')
    .factory('TeacherTeaching', function ($resource) {
        return $resource('schools/:schoolId/complexes/:complexId/teachers/:teacherId/academicYears/:academicYearId/teachings/:teachingId', {
            teachingId: '@_id',
            academicYearId: '@academicYear',
            teacherId: '@teacher',
            complexId: '@complex',
            schoolId: '@school'
        }, {
            update: {
                method: 'PUT'
            }
        });
    });