'use strict';

//Teacher service used for teachers REST endpoint
angular.module('aurea.teachers').factory('Teacher', ['$resource', function($resource) {
    return $resource('teachers/:teacherId', {
        teacherId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);