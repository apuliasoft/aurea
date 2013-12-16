angular.module('aurea')
  .filter('name', [function () {
    return function (input) {
       return input && [input.firstName, input.lastName].join(' ');
    };
  }]);
