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
        $scope.complexes = [{}];
      };

      $scope.create = function () {
        var school = new Schools({
          name: this.name,
          complexes: this.complexes
        });
        school.$save(function (response) {
          $location.path('schools/' + response._id);
        });

        this.name = '';
        this.complexes.length = 0;
      };

      $scope.update = function () {
        var school = $scope.school;
        if (!school.updated) {
          school.updated = [];
        }
        school.updated.push(new Date().getTime());

        school.$update(function () {
          $location.path('schools/' + school._id);
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
          $location.path('schools');
        }
      };

    }]);