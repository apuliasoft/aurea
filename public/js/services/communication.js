'use strict';

//Communication service used for complexes REST endpoint
angular.module('aurea.communications').factory('Communication', ['$resource', function($resource) {
    return $resource('schools/:schoolId/communications/:communicationId', {
        communicationId: '@_id',
        schoolId: '@school'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);