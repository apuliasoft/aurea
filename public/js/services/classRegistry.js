'use strict';

//Class registry service used for academic years REST endpoint
angular.module('aurea.classRegistry').factory('ClassRegistry', ['$resource', function($resource) {
    return $resource('classRegistries/:classId/:date', {
        classId: '@_classId',
        date: '@_date'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);