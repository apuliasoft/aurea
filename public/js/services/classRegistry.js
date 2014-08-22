'use strict';

//Class registry service used for academic years REST endpoint
angular.module('aurea.classRegistry').factory('ClassRegistry', ['$resource', function($resource) {
    return $resource('schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/classRegistries/:date', {
        date: '@_date',
        schoolId: '@school',
        complexId: '@complex',
        academicYearId: '@academicYear',
        schoolClassId: '@schoolClass'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);