'use strict';

//Teacher service used for teachers REST endpoint
angular.module('aurea.teachers').factory('Teacher', ['$resource', function($resource) {
    return $resource('schools/:schoolId/complexes/:complexId/teachers/:teacherId', {
        teacherId: '@_id',
        complexId: '@complex',
        schoolId: '@school'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);