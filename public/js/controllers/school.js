angular.module('aurea.school')
  .controller('SchoolCtrl', ['$scope', '$routeParams', '$location', 'School', 'Province',
    function ($scope, $routeParams, $location, School, Province) {

      $scope.labels = ['Nome Istituto'];
      $scope.columns = ['name'];
      $scope.provinces = Province.getProvinces();

      $scope.list = function () {
        $location.path('scuole');
      };

      $scope.new = function () {
        $location.path('scuole/crea');
      };

      $scope.view = function (school) {
        if (school) {
          $location.path('scuole/' + school._id);
        }
      };

      $scope.edit = function (school) {
        if (school) {
          $location.path('scuole/' + school._id + '/modifica');
        }
      };

      $scope.find = function () {
        School.query(function (schools) {
          $scope.schools = schools;
        });
      };

      $scope.findOne = function () {
        School.get({
          schoolId: $routeParams.schoolId
        }, function (school) {
          $scope.school = school;
        });
      };

      $scope.init = function () {
        $scope.school = { name:'', complexes:[{}]};
      };

      $scope.addComplex = function () {
        $scope.school.complexes.push({});
      };

      $scope.removeComplex = function (index) {
        $scope.school.complexes.splice(index, 1);
      };

      $scope.create = function () {
        var school = new School(this.school);
        school.$save(function (response) {
          $scope.view(response);
        });
        $scope.init();
      };

      $scope.update = function () {
        var school = $scope.school;
        if (!school.updated) {
          school.updated = [];
        }
        school.updated.push(new Date().getTime());

        school.$update(function (response) {
          $scope.view(response);
        });
      };

      $scope.remove = function (school) {
        if (school) {
          school.$remove();
          _.remove($scope.schools, school);
          $scope.list();
        }
      };

    }]);