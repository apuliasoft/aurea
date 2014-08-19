'use strict';

angular.module('aurea.classRegistry').controller('ClassRegistryCtrl', ['$scope', '$stateParams', '$location', '$filter', '_', 'ClassRegistry', 'SchoolClass', 'Teacher', 'Teaching', 'Student', 'Global', function ($scope, $stateParams, $location, $filter, _, ClassRegistry, SchoolClass, Teacher, Teaching, Student, Global) {

    if (!$scope.schoolClasses) {
        $scope.schoolClasses = SchoolClass.query();
    }

    if (!$scope.teachers) {
        $scope.teachers = Teacher.query();
    }

    if (!$scope.teaching) {
        $scope.teachings = Teaching.query();
    }

    if (!$scope.students) {
        $scope.students = Student.query();
    }

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

        var classId = $stateParams.classId;
        var date = new Date($stateParams.date);

        $scope.classRegistry = {
            schoolClass: classId,
            date: date,
            slots: [
                {number: 1},
                {number: 2},
                {number: 3},
                {number: 4},
                {number: 5},
                {number: 6}
            ]
        };

        ClassRegistry.get({
            classId: classId,
            date: date.toISOString()
        }).$promise.then(function (classRegistry) {
            if (!classRegistry.date) {
                classRegistry = new ClassRegistry();

                // I mesi sono zero-based
                classRegistry.slots = [
                    {number: 1},
                    {number: 2},
                    {number: 3},
                    {number: 4},
                    {number: 5},
                    {number: 6}
                ];
            }

            classRegistry = deserializeData(classRegistry);

            $scope.classRegistry = classRegistry;
        });
    };

    $scope.tomorrow = function () {
        var day = new Date($stateParams.date);
        var newDay = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
        $location.path('registri-di-classe/' + $stateParams.classId + '/' + $filter('date')(newDay, 'yyyy-MM-dd'));
    };

    $scope.yesterday = function () {
        var day = new Date($stateParams.date);
        var newDay = new Date(day.getFullYear(), day.getMonth(), day.getDate() - 1);
        $location.path('registri-di-classe/' + $stateParams.classId + '/' + $filter('date')(newDay, 'yyyy-MM-dd'));
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