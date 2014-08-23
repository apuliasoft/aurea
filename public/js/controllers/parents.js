'use strict';

angular.module('aurea.parents').controller('ParentsCtrl', ['$scope', '$stateParams', '$location', '_', 'Global', 'Parent', function ($scope, $stateParams, $location, _, Global, Parent) {
    $scope.global = Global;

    $scope.goToListParents = function () {
        $location.path('genitori');
    };

    $scope.goToCreateParent = function () {
      $location.path('genitori/nuovo');
    };

    $scope.goToEditParent = function(parent) {
      if(parent) {
        $location.path('genitori/' + parent._id);
      }
    };

    $scope.init = function () {
        $scope.parent = new Parent({
            student: Global.getStudent()._id,
            complex: Global.getComplex()._id,
            school: Global.getSchool()._id
        });
    };

    $scope.create = function(isValid) {
        if(isValid) {
            var parent = $scope.parent;
            parent.$save(function () {
                $scope.goToListParents();
            });
        }
    };

    $scope.update = function(isValid) {
        if(isValid) {
            var parent = $scope.parent;
            if (!parent.updated) {
                parent.updated = [];
            }
            parent.updated.push(new Date().getTime());

            parent.$update(function () {
                $scope.goToListParents();
            });
        }
    };

    $scope.remove = function(parent) {
        if (parent) {
            parent.$remove();
            _.remove($scope.parents, parent);
            $scope.goToListParents();
        }
    };

    $scope.find = function() {
        $scope.parents = Parent.query({
            studentId: Global.getStudent()._id,
            complexId: Global.getComplex()._id,
            schoolId: Global.getSchool()._id
        });
    };

    $scope.findOne = function() {
        $scope.parent = Parent.get({
            parentId: $stateParams.parentId,
            studentId: Global.getStudent()._id,
            complexId: Global.getComplex()._id,
            schoolId: Global.getSchool()._id
        });
    };
}]);
