'use strict';

//class student service used for class students REST endpoint
angular.module('aurea.schoolClasses').factory('ClassStudent', ['$resource', function($resource) {
    return $resource('schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/students/:studentId', {
        studentId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);