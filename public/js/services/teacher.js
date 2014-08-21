'use strict';

//Teacher service used for teachers REST endpoint
angular.module('aurea.teachers').factory('Teacher', ['$resource', function($resource) {
    return $resource('complexes/:complexId/teachers/:teacherId', {
        teacherId: '@_id',
        complexId: '@complex'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);