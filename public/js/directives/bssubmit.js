angular.module('aurea')
  .directive('bssubmit', [function () {
    return {
      templateUrl: 'views/directives/bssubmit.html',

      restrict: 'E',

      replace: true,

      transclude: true,

      scope: {},

      link: function postLink() {}

    };
  }]);