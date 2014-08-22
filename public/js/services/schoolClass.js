'use strict';

//School class service used for school classes REST endpoint
angular.module('aurea.schoolClasses').factory('SchoolClass', ['$resource', function($resource) {
    return $resource('schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId', {
        schoolClassId: '@_id',
        schoolId: '@school',
        complexId: '@complex',
        academicYearId: '@academicYear'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);