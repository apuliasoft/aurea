angular.module('aurea')
  .filter('address', [function () {
    return function (input) {
      return input && [input.address, input.zipCode, input.city, input.province].join(' ');
    };
  }]);
