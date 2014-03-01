angular.module('aurea.schoolClass')
  .controller('SchoolClassCtrl', ['$scope', '$routeParams', '$location', 'SchoolClass',
    function ($scope, $routeParams, $location, SchoolClass) {

      $scope.labels = ['Nome'];
      $scope.columns = ['name'];

      $scope.list = function () {
        $location.path('classi');
      };

      $scope.new = function () {
        $location.path('classi/crea');
      };

      $scope.view = function (schoolClass) {
        if (schoolClass) {
          $location.path('classi/' + schoolClass._id);
        }
      };

      $scope.edit = function (schoolClass) {
        if (schoolClass) {
          $location.path('classi/' + schoolClass._id + '/modifica');
        }
      };

      $scope.find = function () {
        $scope.schoolClasses = SchoolClass.query();
      };

      $scope.findOne = function () {
        $scope.schoolClass = SchoolClass.get({
          schoolClassId: $routeParams.schoolClassId
        });
      };

      $scope.init = function () {
        $scope.schoolClass = new SchoolClass();
      };

      $scope.create = function () {
        var schoolClass = $scope.schoolClass;
        schoolClass.$save(function (response) {
          $scope.view(response);
        });
        $scope.init();
      };

      $scope.update = function () {
        var schoolClass = $scope.schoolClass;
        if (!schoolClass.updated) {
          schoolClass.updated = [];
        }
        schoolClass.updated.push(new Date().getTime());

        schoolClass.$update(function (response) {
          $scope.view(response);
        });
      };

      $scope.remove = function (schoolClass) {
        if (schoolClass) {
          schoolClass.$remove();
          _.remove($scope.schoolClasses, schoolClass);
          $scope.list();
        }
      };

    }]);