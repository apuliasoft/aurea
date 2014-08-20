'use strict';

//Complex service used for complexes REST endpoint
angular.module('aurea.complexes').factory('Complex', ['$resource', function($resource) {
    return $resource('schools/:schoolId/complexes/:complexId', {
        complexId: '@_id',
        schoolId: '@school'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);