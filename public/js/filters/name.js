'use strict';

//Name filter used for format a person object
angular.module('aurea').filter('name', [function() {
    return function (input) {
        return input && [input.firstName, input.lastName].join(' ');
    };
}]);
