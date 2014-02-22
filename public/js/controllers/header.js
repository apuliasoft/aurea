angular.module('aurea.system')
  .controller('HeaderCtrl', ['$scope', 'Global', 'SchoolContext',
    function ($scope, Global, SchoolContext) {
      $scope.global = Global;
      $scope.globalSchools = SchoolContext.schools();

      $scope.menu = [
        {
          "title": "Articles",
          "link": "articles"
        },
        {
          "title": "Create New Article",
          "link": "articles/create"
        }
      ];

      $scope.isCollapsed = false;
    }]);