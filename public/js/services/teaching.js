'use strict';

//Teaching service used for teachings REST endpoint
angular.module('aurea.teachings').factory('Teaching', ['$resource', function($resource) {
    return $resource('teachings/:teachingId', {
        teachingId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);