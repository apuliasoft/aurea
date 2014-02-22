angular.module('aurea')
  .directive('datatable', [function () {
    return {
      templateUrl: 'views/directives/datatable.html',

      restrict: 'E',

      replace: true,

      scope: {
        labels: '=',
        columns: '=',
        list: '=',
        view: '&',
        edit: '&',
        remove: '&'
      },

      link: function postLink(scope) {
        scope.getData = function(elem, col) {
          return elem[col];
        };
      }

    };
  }]);