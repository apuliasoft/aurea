'use strict';

//School class service used for school classes REST endpoint
angular.module('aurea.schoolClasses').factory('SchoolClass', ['$resource', function($resource) {
    return $resource('schoolClasses/:schoolClassId', {
        schoolClassId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);