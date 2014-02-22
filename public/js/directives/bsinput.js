angular.module('aurea')
  .directive('bsinput', [function () {
    return {
      templateUrl: 'views/directives/bsinput.html',

      restrict: 'E',

      replace: true,

      transclude: true,

      scope: {
        type: '@',
        model: '=',
        id: '@',
        placeholder: '@'
      },

      link: function postLink() {}

    };
  }]);