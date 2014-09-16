'use strict';

//Teaching registry service used for teaching registry REST endpoint
angular.module('aurea.teachingRegistry').factory('TeachingRegistry', ['$resource', function($resource) {
    return $resource('schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/teachings/:teachingId/teachingRegistries/:date', {
        date: '@_date',
        schoolId: '@school',
        complexId: '@complex',
        academicYearId: '@academicYear',
        schoolClassId: '@schoolClass',
        teachingId: '@teaching'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);