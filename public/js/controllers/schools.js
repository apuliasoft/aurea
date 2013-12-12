angular.module('aurea.schools')
  .controller('SchoolsController', ['$scope', '$routeParams', '$location', 'Schools',
    function ($scope, $routeParams, $location, Schools) {

      $scope.find = function () {
        Schools.query(function (schools) {
          $scope.schools = schools;
        });
      };

      $scope.findOne = function () {
        Schools.get({
          schoolId: $routeParams.schoolId
        }, function (school) {
          $scope.school = school;
        });
      };

      $scope.init = function () {
        $scope.school = {
          name: '',
          complexes: [{}]
        };
      };

      $scope.addComplex = function () {
        $scope.school.complexes.push({});
      };

      $scope.removeComplex = function (index) {
        $scope.school.complexes.splice(index, 1);
      };

      $scope.create = function () {
        var school = new Schools(this.school);
        school.$save(function (response) {
          $location.path('scuole/' + response._id);
        });

        $scope.init();
      };

      $scope.update = function () {
        var school = $scope.school;
        if (!school.updated) {
          school.updated = [];
        }
        school.updated.push(new Date().getTime());

        school.$update(function () {
          $location.path('scuole/' + school._id);
        });
      };

      $scope.remove = function (school) {
        if (school) {
          school.$remove();

          for (var i in $scope.schools) {
            if ($scope.schools[i] == school) {
              $scope.schools.splice(i, 1);
            }
          }
        }
        else {
          $scope.school.$remove();
          $location.path('scuole');
        }
      };

      $scope.confirmRemove = function (school) {
        if (confirm('Sei sicuro di voler cancellare la scuola?')) {
          $scope.remove(school);
        }
      };

    }]);