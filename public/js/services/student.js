'use strict';

//Student service used for students REST endpoint
angular.module('aurea.students').factory('Student', ['$resource', function($resource) {
    return $resource('students/:studentId', {
        studentId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);