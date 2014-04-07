'use strict';

//User service used for users REST endpoint
angular.module('aurea.users').factory('User', ['$resource', function($resource) {
    return $resource('users/:userId', {
        userId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);