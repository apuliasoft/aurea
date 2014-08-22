'use strict';

//Student service used for students REST endpoint
angular.module('aurea.students').factory('Student', ['$resource', function($resource) {
    return $resource('schools/:schoolId/complexes/:complexId/students/:studentId', {
        studentId: '@_id',
        complexId: '@complex',
        schoolId: '@school'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);