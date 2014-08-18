'use strict';

//Complex service used for complexes REST endpoint
angular.module('aurea.complexes').factory('Complex', ['$resource', function($resource) {
    return $resource('complexes/:complexId', {
        complexId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);