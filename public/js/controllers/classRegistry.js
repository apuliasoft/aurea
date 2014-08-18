'use strict';

angular.module('aurea.classRegistry').controller('ClassRegistryCtrl', ['$scope', '$stateParams', '$location', '$filter', '_', 'ClassRegistry', 'SchoolClass', 'Teacher', 'Teaching', 'Student', function ($scope, $stateParams, $location, $filter, _, ClassRegistry, SchoolClass, Teacher, Teaching, Student) {

    if (!$scope.schoolClasses) {
        $scope.schoolClasses = SchoolClass.query();
    }

    if (!$scope.teachers) {
        $scope.teachers = Teacher.query();
    }

    if (!$scope.teaching) {
        $scope.teachings = Teaching.query();
    }

    if(!$scope.students) {
        $scope.students = Student.query();
    }

    function getDateFromUrl() {
        var dateArray = $stateParams.classRegistryDate.split('-');
        return new Date(/*year*/dateArray[2], /*month*/dateArray[1] - 1, /*day*/dateArray[0]);
    }

    function getEmptyClassRegistry() {
        return {
            slots: [
                {number: 1},
                {number: 2},
                {number: 3},
                {number: 4},
                {number: 5},
                {number: 6}
            ]
        };
    }

    $scope.init = function () {

        $scope.classRegistry = getEmptyClassRegistry();

        var day = getDateFromUrl();

        var tempClassRegistry = ClassRegistry.get({
            classRegistryDate: day
        });
        tempClassRegistry.$promise.then(function (tempClassRegistry) {
            if (!tempClassRegistry.day) {
                tempClassRegistry = new ClassRegistry();

                // I mesi sono zero-based
                tempClassRegistry.day = day;
                tempClassRegistry.slots = [
                    {number: 1},
                    {number: 2},
                    {number: 3},
                    {number: 4},
                    {number: 5},
                    {number: 6}
                ];
            }
            $scope.classRegistry = tempClassRegistry;
        });
    };

    $scope.tomorrow = function () {
        var day = getDateFromUrl();
        var newDay = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
        $location.path('registri-di-classe/' + $filter('date')(newDay, 'd-M-yyyy'));
    };

    $scope.yesterday = function () {
        var day = getDateFromUrl();
        var newDay = new Date(day.getFullYear(), day.getMonth(), day.getDate() - 1);
        $location.path('registri-di-classe/' + $filter('date')(newDay, 'd-M-yyyy'));
    };

    $scope.onUpdate = function (classRegistry) {
        console.log('Aggiornato con successo:');
        console.log(classRegistry);
    };

    $scope.save = function () {
        var classRegistry = $scope.classRegistry;

        if (!classRegistry.updated) {
            classRegistry.updated = [];
        }
        classRegistry.updated.push(new Date().getTime());

        classRegistry._day = $filter('date')(classRegistry.day, 'yyyy-M-d');

        classRegistry.$update(function (response) {
            $scope.onUpdate(response);
        });
    };

}]);