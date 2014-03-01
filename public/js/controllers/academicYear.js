angular.module('aurea.academicYear')
  .controller('AcademicYearCtrl', ['$scope', '$routeParams', '$location', 'AcademicYear',
    function ($scope, $routeParams, $location, AcademicYear) {

      $scope.labels = ['Anno accademico', 'Data inizio', 'Data fine'];
      $scope.columns = ['name', 'startDate', 'endDate'];

      $scope.list = function () {
        $location.path('aa');
      };

      $scope.new = function () {
        $location.path('aa/crea');
      };

      $scope.view = function (academicYear) {
        if (academicYear) {
          $location.path('aa/' + academicYear._id);
        }
      };

      $scope.edit = function (academicYear) {
        if (academicYear) {
          $location.path('aa/' + academicYear._id + '/modifica');
        }
      };

      $scope.find = function () {
        $scope.academicYears = AcademicYear.query();
      };

      $scope.findOne = function () {
        $scope.academicYear = AcademicYear.get({
          academicYearId: $routeParams.academicYearId
        });
      };

      $scope.init = function () {
        $scope.academicYear = new AcademicYear();
      };

      $scope.create = function () {
        var academicYear = $scope.academicYear;
        academicYear.$save(function (response) {
          $scope.view(response);
        });
        $scope.init();
      };

      $scope.update = function () {
        var academicYear = $scope.academicYear;
        if (!academicYear.updated) {
          academicYear.updated = [];
        }
        academicYear.updated.push(new Date().getTime());

        academicYear.$update(function (response) {
          $scope.view(response);
        });
      };

      $scope.remove = function (academicYear) {
        if (academicYear) {
          academicYear.$remove();
          _.remove($scope.academicYears, academicYear);
          $scope.list();
        }
      };

    }]);