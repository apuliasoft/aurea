'use strict';

angular.module('aurea.schoolClasses').controller('SchoolClassesCtrl', ['$scope', '$stateParams', '$location', '_', 'Global', 'SchoolClass', function ($scope, $stateParams, $location, _, Global, SchoolClass) {
    $scope.global = Global;

    $scope.columns = [
        {name:'name', label:'Nome'}
    ];

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

    $scope.init = function () {
        $scope.schoolClass = new SchoolClass();
    };

    $scope.create = function() {
        var schoolClass = $scope.schoolClass;
        schoolClass.$save(function (response) {
            $scope.view(response);
        });
        $scope.init();
    };

    $scope.remove = function(schoolClass) {
        if (schoolClass) {
            schoolClass.$remove();
            _.remove($scope.schoolClasses, schoolClass);
            $scope.list();
        }
    };

    $scope.update = function() {
        var schoolClass = $scope.schoolClass;
        if (!schoolClass.updated) {
            schoolClass.updated = [];
        }
        schoolClass.updated.push(new Date().getTime());

        schoolClass.$update(function (response) {
            $scope.view(response);
        });
    };

    $scope.find = function() {
        $scope.schoolClasses = SchoolClass.query();
    };

    $scope.findOne = function() {
        $scope.schoolClass = SchoolClass.get({
            schoolClassId: $stateParams.schoolClassId
        });
    };
}]);