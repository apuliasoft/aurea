'use strict';

//Name filter used for format a person object
angular.module('aurea')
    .filter('name', function () {
        return function (input, reverse) {
            if (!reverse) {
                return input && [input.firstName, input.lastName].join(' ');
            }
            return input && [input.lastName, input.firstName].join(' ');
        };
    });
