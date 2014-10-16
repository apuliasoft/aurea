'use strict';

//School service used for schools REST endpoint
angular.module('aurea.schools')
    .factory('School', function ($resource) {
        return $resource('schools/:schoolId', {
            schoolId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    });