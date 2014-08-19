'use strict';

//Name filter used for format a person object
angular.module('aurea').filter('minute', [function() {
    return function (input) {
        var minutes = 0;
        var timeArr = input && input.split(':');
        if(timeArr && Array.isArray(timeArr) && timeArr.length === 2) {
            minutes = parseInt(timeArr[0]) * 60 + parseInt(timeArr[1]);
        }
        return minutes;
    };
}]);
