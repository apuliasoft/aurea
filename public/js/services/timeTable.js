'use strict';

//Time Table service used for time table REST endpoint
angular.module('aurea.timeTables').factory('TimeTable', ['$resource', function($resource) {

    /*function transformRequest(data){
      console.log(data);
    }*/

    return $resource(
      'timetables/:timeTableId', {
        timeTableId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);