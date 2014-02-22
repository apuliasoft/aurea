angular.module('aurea')
  .directive('bsbutton', [function () {
    return {
      templateUrl: 'views/directives/bsbutton.html',

      restrict: 'E',

      replace: true,

      transclude: true,

      scope: {
        click: '&'
      },

      link: function postLink() {}

    };
  }]);