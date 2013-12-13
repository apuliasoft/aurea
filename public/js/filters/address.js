angular.module('aurea')
  .filter('address', [function () {
    return function (input) {
      return [input.address, input.zipCode, input.city, input.province].join(' ');
    };
  }]);