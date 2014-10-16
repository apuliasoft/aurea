'use strict';

//Complex service used for complexes REST endpoint
angular.module('aurea.complexes')
    .factory('Complex', function ($resource) {
        return $resource('schools/:schoolId/complexes/:complexId', {
            complexId: '@_id',
            schoolId: '@school'
        }, {
            update: {
                method: 'PUT'
            }
        });
    });