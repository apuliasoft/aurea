'use strict';

//Time Table service used for time table REST endpoint
angular.module('aurea.timeTables').factory('TimeTable', ['$resource', function($resource) {

    return $resource(
      'timetables/:timeTableId', {
        timeTableId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);