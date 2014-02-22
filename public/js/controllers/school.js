angular.module('aurea.school')
  .controller('SchoolCtrl', ['$scope', '$routeParams', '$location', 'School',
    function ($scope, $routeParams, $location, School) {

      $scope.labels = ['Nome Istituto'];
      $scope.columns = ['name'];

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
        $scope.school = {
          name: '',
          complexes: [
            {}
          ]
        };
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

      $scope.view = function (school) {
        if (school) {
          $location.path('scuole/' + school._id);
        }
      };

      $scope.new = function () {
        $location.path('scuole/crea');
      };

      $scope.edit = function (school) {
        if (school) {
          $location.path('scuole/' + school._id + '/modifica');
        }
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

    }]);