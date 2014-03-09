'use strict';

angular.module('aurea.academicYears').controller('AcademicYearsCtrl', ['$scope', '$stateParams', '$location', '_', 'Global', 'AcademicYear', function ($scope, $stateParams, $location, _, Global, AcademicYear) {
    $scope.global = Global;

    $scope.columns = [
        {name:'name', label:'Nome'},
        {name:'startDate', label:'Data inizio', filter:'date'},
        {name:'endDate', label:'Data fine', filter:'date'}
    ];

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

    $scope.init = function () {
        $scope.academicYear = new AcademicYear();
    };

    $scope.create = function() {
        var academicYear = $scope.academicYear;
        academicYear.$save(function (response) {
            $scope.view(response);
        });
        $scope.init();
    };

    $scope.remove = function(academicYear) {
        if (academicYear) {
            academicYear.$remove();
            _.remove($scope.academicYears, academicYear);
            $scope.list();
        }
    };

    $scope.update = function() {
        var academicYear = $scope.academicYear;
        if (!academicYear.updated) {
            academicYear.updated = [];
        }
        academicYear.updated.push(new Date().getTime());

        academicYear.$update(function (response) {
            $scope.view(response);
        });
    };

    $scope.find = function() {
        $scope.academicYears = AcademicYear.query();
    };

    $scope.findOne = function() {
        $scope.academicYear = AcademicYear.get({
            academicYearId: $stateParams.academicYearId
        });
    };
}]);