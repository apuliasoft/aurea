angular.module('aurea')
  .directive('bsselect', [function () {
    return {
      templateUrl: 'views/directives/bsselect.html',

      restrict: 'E',

      replace: true,

      transclude: true,

      scope: {
        model: '=',
        options: '=',
        value: '@',
        label: '@',
        id: '@'
      },

      link: function postLink(scope) {
        scope.getValue = function (option) {
          return option[scope.value];
        };

        scope.getLabel = function (option) {
          return option[scope.label];
        };
      }

    };
  }]);