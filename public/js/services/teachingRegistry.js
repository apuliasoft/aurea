'use strict';

//Teaching registry service used for teaching registry REST endpoint
angular.module('aurea.teachingRegistry').factory('TeachingRegistry', ['$resource', function($resource) {
    return $resource('teachingRegistries/:teachingRegistryDate', {
        teachingRegistryDate: '@_day'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);