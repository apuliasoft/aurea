'use strict';

//Parent service used for complexes REST endpoint
angular.module('aurea.parents').factory('Parent', ['$resource', function($resource) {
    return $resource('schools/:schoolId/complexes/:complexId/students/:studentId/parents/:parentId', {
        parentId: '@_id',
        studentId: '@student',
        complexId: '@complex',
        schoolId: '@school'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);