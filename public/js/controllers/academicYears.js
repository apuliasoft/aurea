'use strict';

angular.module('aurea.academicYears').controller('AcademicYearsCtrl', ['$scope', '$stateParams', '$location', '$filter', '_', 'Global', 'AcademicYear', 'Complex', function ($scope, $stateParams, $location, $filter, _, Global, AcademicYear, Complex) {
    $scope.global = Global;

    $scope.columns = [
        {name:'name', label:'Nome'},
        {name:'startDate', label:'Data inizio', filter:'date'},
        {name:'endDate', label:'Data fine', filter:'date'}
    ];

    if(!$scope.complexes) {
        $scope.complexes = Complex.query();
    }

    $scope.getComplexName = function(complexId) {
        var complex = _.find($scope.complexes, function(complex) {
            return complex._id === complexId;
        });

        return complex && complex.name;
    };

    $scope.list = function () {
        $location.path('anni-accademici');
    };

    $scope.new = function () {
        $location.path('anni-accademici/crea');
    };

    $scope.view = function (academicYear) {
        if (academicYear) {
            $location.path('anni-accademici/' + academicYear._id);
        }
    };

    $scope.edit = function (academicYear) {
        if (academicYear) {
            $location.path('anni-accademici/' + academicYear._id + '/modifica');
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
        },
        function(academicYear){
            academicYear.startDate = $filter('date')(academicYear.startDate, 'yyyy-MM-dd');
            academicYear.endDate = $filter('date')(academicYear.endDate, 'yyyy-MM-dd');
        });
    };
}]);