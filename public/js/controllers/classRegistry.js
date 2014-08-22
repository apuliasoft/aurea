'use strict';

angular.module('aurea.classRegistry').controller('ClassRegistryCtrl', ['$scope', '$stateParams', '$location', '$filter', '_', 'Global', 'ClassRegistry', 'ClassStudent', function ($scope, $stateParams, $location, $filter, _, Global, ClassRegistry, ClassStudent) {

    /**
     * Converte il formato degli orari.
     * @param classRegistry
     */
    var serializeData = function (classRegistry) {

        classRegistry.lateEntrances = _.map(classRegistry.lateEntrances, function (lateEntrance) {
            lateEntrance.timestamp = $filter('minute')(lateEntrance.timestamp);
            return lateEntrance;
        });

        classRegistry.earlyLeaves = _.map(classRegistry.earlyLeaves, function (earlyLeave) {
            earlyLeave.timestamp = $filter('minute')(earlyLeave.timestamp);
            return earlyLeave;
        });

        return classRegistry;
    };

    /**
     * Converte il formato degli orari.
     * @param classRegistry
     */
    var deserializeData = function (classRegistry) {

        classRegistry.lateEntrances = _.map(classRegistry.lateEntrances, function (lateEntrance) {
            lateEntrance.timestamp = $filter('time')(lateEntrance.timestamp);
            return lateEntrance;
        });

        classRegistry.earlyLeaves = _.map(classRegistry.earlyLeaves, function (earlyLeave) {
            earlyLeave.timestamp = $filter('time')(earlyLeave.timestamp);
            return earlyLeave;
        });

        return classRegistry;
    };

    $scope.init = function () {

        // Carico gli studenti della classe
        $scope.classStudents = ClassStudent.query({
            schoolClassId: Global.getSchoolClass()._id,
            complexId: Global.getComplex()._id,
            schoolId: Global.getSchool()._id,
            academicYearId: Global.getAcademicYear()._id
        });

        var date = new Date($stateParams.date);
        var schoolClass = Global.getSchoolClass()._id;
        var school = Global.getSchool()._id;
        var complex = Global.getComplex()._id;
        var academicYear = Global.getAcademicYear()._id;
        var weekDay = date.getDay() === 0 ? 7 : date.getDay();

        var day = _.find(Global.getAcademicYear().timeTable, function (day) {
            return day.weekDay === weekDay;
        });

        var slots = [];
        if (day) {
            slots = _.map(day.slots, function (slot, index) {
                return {number: index + 1};
            });
        }

        $scope.classRegistry = new ClassRegistry({
            schoolClass: schoolClass,
            date: date,
            school: school,
            complex: complex,
            academicYear: academicYear,

            slots: slots
        });

        ClassRegistry.get({
            schoolClassId: schoolClass,
            date: date.toISOString(),
            schoolId: school,
            complexId: complex,
            academicYearId: academicYear
        }).$promise.then(function (classRegistry) {
              $scope.classRegistry = deserializeData(classRegistry);
          });
    };

    $scope.tomorrow = function () {
        var day = new Date($stateParams.date);
        var newDay = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
        $location.path('registri-di-classe/' + $filter('date')(newDay, 'yyyy-MM-dd'));
    };

    $scope.yesterday = function () {
        var day = new Date($stateParams.date);
        var newDay = new Date(day.getFullYear(), day.getMonth(), day.getDate() - 1);
        $location.path('registri-di-classe/' + $filter('date')(newDay, 'yyyy-MM-dd'));
    };

    $scope.save = function () {
        var classRegistry = $scope.classRegistry;
        classRegistry = serializeData(classRegistry);

        if (!classRegistry.updated) {
            classRegistry.updated = [];
        }
        classRegistry.updated.push(new Date().getTime());

        classRegistry._classId = $stateParams.classId;
        classRegistry._date = classRegistry.date.toISOString();

        classRegistry.$update(function () {
            classRegistry = deserializeData(classRegistry);
        });
    };

    $scope.addLateEntrance = function () {
        if (!$scope.classRegistry.lateEntrances) {
            $scope.classRegistry.lateEntrances = [];
        }
        $scope.classRegistry.lateEntrances.push({});
    };

    $scope.deleteLateEntrance = function (lateEntrance) {
        _.remove($scope.classRegistry.lateEntrances, lateEntrance);
    };

    $scope.addEarlyLeave = function () {
        if (!$scope.classRegistry.earlyLeaves) {
            $scope.classRegistry.earlyLeaves = [];
        }
        $scope.classRegistry.earlyLeaves.push({});
    };

    $scope.deleteEarlyLeave = function (earlyLeave) {
        _.remove($scope.classRegistry.earlyLeaves, earlyLeave);
    };
}]);