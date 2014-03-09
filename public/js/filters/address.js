'use strict';

//Address filter used for format an address object
angular.module('aurea').filter('address', [function() {
    return function (input) {
        return input && [input.street, input.zipCode, input.city, input.province].join(' ');
    };
}]);
