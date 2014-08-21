'use strict';

//Parent service used for complexes REST endpoint
angular.module('aurea.parents').factory('Parent', ['$resource', function($resource) {
    return $resource('students/:studentId/parents/:parentId', {
        parentId: '@_id',
        studentId: '@student'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);