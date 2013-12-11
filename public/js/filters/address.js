angular.module('aurea.schools')
  .filter('address', [function () {
    return function (input) {
      address = [input.address, input.zipCode, input.city, input.province];

      return address.join(' ');
    };
  }]);