'use strict';

angular.module('aurea.academicYears').controller('AcademicYearsCtrl', ['$scope', '$stateParams', '$location', '$filter', '_', 'Global', 'AcademicYear', 'Complex', function ($scope, $stateParams, $location, $filter, _, Global, AcademicYear, Complex) {
    $scope.global = Global;

    $scope.columns = [
        {name: 'name', label: 'Nome'},
        {name: 'startDate', label: 'Data inizio', filter: 'date'},
        {name: 'endDate', label: 'Data fine', filter: 'date'}
    ];

    if (!$scope.complexes) {
        $scope.complexes = Complex.query({
            schoolId: Global.getSchool()._id
        });
    }

    $scope.getComplexName = function (complexId) {
        var complex = _.find($scope.complexes, function (complex) {
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
        $scope.academicYear.timeTable = _.map(_.range(1, 7), function (num) {
            return {
                weekDay: num,
                slots: [
                    {start: '08:00', end: '09:00'},
                    {start: '09:00', end: '10:00'},
                    {start: '10:00', end: '11:00'},
                    {start: '11:00', end: '12:00'},
                    {start: '12:00', end: '13:00'},
                    {start: '13:00', end: '14:00'}
                ]
                //TODO in produzione sostituire il blocco sottostante con quello presente sopra
                /*slots: [
                 {start: undefined, end: undefined},
                 {start: undefined, end: undefined},
                 {start: undefined, end: undefined},
                 {start: undefined, end: undefined},
                 {start: undefined, end: undefined},
                 {start: undefined, end: undefined}
                 ]*/
            };
        });
    };

    $scope.isNotEmptySlot = function (slot) {
        return slot.start && slot.end;
    };

    $scope.create = function (isValid) {
        if(isValid) {
            var academicYear = $scope.academicYear;
            academicYear.timeTable = serializeData(academicYear.timeTable);

            academicYear.$save(function (response) {
                $scope.view(response);
            });
            $scope.init();
        }
    };

    $scope.remove = function (academicYear) {
        if (academicYear) {
            academicYear.$remove();
            _.remove($scope.academicYears, academicYear);
            $scope.list();
        }
    };

    $scope.update = function (isValid) {
        if(isValid) {
            var academicYear = $scope.academicYear;
            academicYear.timeTable = serializeData(academicYear.timeTable);

            if (!academicYear.updated) {
                academicYear.updated = [];
            }
            academicYear.updated.push(new Date().getTime());

            academicYear.$update(function (response) {
                $scope.view(response);
            });
        }
    };

    $scope.find = function () {
        $scope.academicYears = AcademicYear.query({
            complexId: Global.getComplex()._id
        });
    };

    $scope.findOne = function () {
        AcademicYear.get({
            academicYearId: $stateParams.academicYearId,
            complexId: Global.getComplex()._id
        }).$promise.then(function (academicYear) {
                academicYear.startDate = $filter('date')(academicYear.startDate, 'yyyy-MM-dd');
                academicYear.endDate = $filter('date')(academicYear.endDate, 'yyyy-MM-dd');
                academicYear.timeTable = deserializeData(academicYear.timeTable);

                $scope.academicYear = academicYear;
            });
    };

    /**
     * Elimina gli slot vuoti e converte il formato degli slot orari.
     * @param timeTable
     */
    var serializeData = function (timeTable) {

        timeTable = _.map(timeTable, function (day) {
            day.slots = _.filter(day.slots, function (slot) {
                return $scope.isNotEmptySlot(slot);
            });

            day.slots = _.map(day.slots, function (slot) {
                return {
                    start: $filter('minute')(slot.start),
                    end: $filter('minute')(slot.end)
                };
            });

            return day;
        });

        return timeTable;
    };

    /**
     * Aggiunge gli slot vuoti se necessatio e converte il formato degli slot orari.
     * @param timeTable
     */
    var deserializeData = function (timeTable) {

        timeTable = _.map(timeTable, function (day) {

            day.slots = _.map(day.slots, function (slot) {
                return {
                    start: $filter('time')(slot.start),
                    end: $filter('time')(slot.end)
                };
            });

            for (var i = 0; i < (6 - day.slots.length); i++) {
                day.slots.push({start: undefined, end: undefined});
            }

            return day;
        });

        return timeTable;
    };
}]);