'use strict';

//Class registry service used for academic years REST endpoint
angular.module('aurea.classRegistry').factory('ClassRegistry', ['$resource', function($resource) {
    return $resource('classRegistries/:classRegistryDate', {
        classRegistryDate: '@_day'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);