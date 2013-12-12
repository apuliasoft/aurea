angular.module('aurea')
  .filter('name', [function () {
    return function (input) {
      return [input.firstName, input.lastName].join(' ');
    };
  }]);