'use strict';

angular.module('aurea.classRegistry').controller('ClassRegistryCtrl', ['$scope', '$stateParams', '$filter', '_', 'ngToast', '$modal', 'SmartState', 'Global', 'ClassRegistry', 'ClassStudent', 'Teacher', 'Teaching', function ($scope, $stateParams, $filter, _, ngToast, $modal, SmartState, Global, ClassRegistry, ClassStudent, Teacher, Teaching) {

    $scope.$watch('classRegistry.date', function () {
        if ($scope.classRegistry) {
            var day = new Date($scope.classRegistry.date);
            SmartState.go('class registry by date', {
                date: $filter('date')(day, 'yyyy-MM-dd')
            });
        }
    });

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

        $scope.teachers = Teacher.query({
            schoolId: Global.getSchool()._id,
            complexId: Global.getComplex()._id
        });

        $scope.teachings = Teaching.query({
            schoolId: Global.getSchool()._id,
            complexId: Global.getComplex()._id,
            academicYearId: Global.getAcademicYear()._id,
            schoolClassId: Global.getSchoolClass()._id
        });

        $scope.selectedStudents = [];

        var date = new Date($stateParams.date);
        var schoolClass = Global.getSchoolClass()._id;
        var school = Global.getSchool()._id;
        var complex = Global.getComplex()._id;
        var academicYear = Global.getAcademicYear()._id;

        ClassRegistry.get({
            schoolClassId: schoolClass,
            date: date.toISOString(),
            schoolId: school,
            complexId: complex,
            academicYearId: academicYear
        }).$promise.then(function (classRegistry) {
              $scope.classRegistry = deserializeData(classRegistry);
              $scope.weekdays = _.map(Global.getAcademicYear().timeTable, function(slot){
                  return slot.weekDay === 7 ? 0: slot.weekDay;
              });
          });
    };

    $scope.tomorrow = function () {
        var day = new Date($stateParams.date);
        var newDay = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
        SmartState.go('class registry by date', {
            date: $filter('date')(newDay, 'yyyy-MM-dd')
        });
    };

    $scope.yesterday = function () {
        var day = new Date($stateParams.date);
        var newDay = new Date(day.getFullYear(), day.getMonth(), day.getDate() - 1);
        SmartState.go('class registry by date', {
            date: $filter('date')(newDay, 'yyyy-MM-dd')
        });
    };

    $scope.save = function () {
        var classRegistry = $scope.classRegistry;
        classRegistry = serializeData(classRegistry);

        if (!classRegistry.updated) {
            classRegistry.updated = [];
        }
        classRegistry.updated.push(new Date().getTime());

        classRegistry._date = classRegistry.date;

        classRegistry.$update(function () {
            classRegistry = deserializeData(classRegistry);
            ngToast.create('Salvataggio riuscito.');
        });
    };

    // UTILITY FUNCTIONS

    $scope.dateOptions = {
        startingDay: 1,
        showWeeks: false,
        datepickerMode: 'day'
    };

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    // Disabilita i giorni per cui non c'è la timetable
    $scope.disabled = function (date, mode) {
        return ( mode === 'day' && !_.contains($scope.weekdays, date.getDay()));
    };

    $scope.toggleStudentSelection = function (student) {

        $scope.classStudents = _.map($scope.classStudents, function (classStudent) {
            if (student._id === classStudent._id) {
                return _.extend({}, classStudent, {selected: !classStudent.selected});
            } else {
                return classStudent;
            }
        });
    };

    $scope.isValidEntranceSelection = function () {
        var selectedStudents = _.chain($scope.classStudents)
          .filter(function (classStudent) {
              return classStudent.selected;
          })
          .map(function (selectedStudent) {
              return selectedStudent._id;
          })
          .value();

        return selectedStudents.length === 1;
    };

    $scope.isValidLeaveSelection = function () {
        var selectedStudents = _.chain($scope.classStudents)
          .filter(function (classStudent) {
              return classStudent.selected;
          })
          .map(function (selectedStudent) {
              return selectedStudent._id;
          })
          .value();

        return selectedStudents.length === 1;
    };

    $scope.noneSelected = function () {
        var selectedStudents = _.chain($scope.classStudents)
          .filter(function (classStudent) {
              return classStudent.selected;
          })
          .map(function (selectedStudent) {
              return selectedStudent._id;
          })
          .value();

        return selectedStudents.length === 0;
    };

    $scope.clearSelection = function () {
        _.map($scope.classStudents, function (classStudent) {
            classStudent.selected = false;
        });
    };

    $scope.toggleAbsents = function () {
        var selectedStudents = _.chain($scope.classStudents)
          .filter(function (classStudent) {
              return classStudent.selected;
          })
          .map(function (selectedStudent) {
              return selectedStudent._id;
          })
          .value();

        $scope.classRegistry.absences = _.xor($scope.classRegistry.absences, selectedStudents);

        $scope.clearSelection();
    };

    $scope.studentIsAbsent = function (student) {
        return $scope.classRegistry &&
          _.contains($scope.classRegistry.absences, student._id);
    };

    $scope.studentHasLeft = function (student) {
        return $scope.classRegistry &&
          _.some($scope.classRegistry.earlyLeaves, function (earlyLeave) {
              return earlyLeave.student === student._id;
          });
    };

    $scope.studentHasEntered = function (student) {
        return $scope.classRegistry &&
          _.some($scope.classRegistry.lateEntrances, function (lateEntrance) {
              return lateEntrance.student === student._id;
          });
    };

    $scope.addEarlyLeave = function () {
        var student = _.find($scope.classStudents, function (student) {
            return student.selected;
        })._id;

        var time = _.find($scope.classRegistry.earlyLeaves, function (earlyLeave) {
            return earlyLeave.student === student;
        });

        time = time ? time.timestamp : null;

        var modalInstance = $modal.open({
            templateUrl: 'selectTime.html',
            controller: SelectTimeCtrl,
            size: 'sm',
            resolve: {
                time: function () {
                    return time;
                }
            }
        });

        modalInstance.result.then(function (leaveTime) {
            var selectedStudent = _.find($scope.classStudents, function (student) {
                return student.selected;
            })._id;

            if (leaveTime) {

                $scope.classRegistry.earlyLeaves.push({
                    student: selectedStudent,
                    timestamp: leaveTime
                });
            } else {
                var earlyLeave = _.find($scope.classRegistry.earlyLeaves, function (earlyLeave) {
                    return earlyLeave.student === selectedStudent;
                });
                _.remove($scope.classRegistry.earlyLeaves, earlyLeave);
            }
            $scope.clearSelection();
        });
    };

    $scope.addLateEntrance = function () {

        var student = _.find($scope.classStudents, function (student) {
            return student.selected;
        })._id;

        var time = _.find($scope.classRegistry.lateEntrances, function (lateEntrance) {
            return lateEntrance.student === student;
        });

        time = time ? time.timestamp : null;

        var modalInstance = $modal.open({
            templateUrl: 'selectTime.html',
            controller: SelectTimeCtrl,
            size: 'sm',
            resolve: {
                time: function () {
                    return time;
                }
            }
        });

        modalInstance.result.then(function (entranceTime) {
            var selectedStudent = _.find($scope.classStudents, function (student) {
                return student.selected;
            })._id;

            if (entranceTime) {

                $scope.classRegistry.lateEntrances.push({
                    student: selectedStudent,
                    timestamp: entranceTime
                });
            } else {
                var lateEntrance = _.find($scope.classRegistry.lateEntrances, function (lateEntrance) {
                    return lateEntrance.student === selectedStudent;
                });
                _.remove($scope.classRegistry.lateEntrances, lateEntrance);
            }
            $scope.clearSelection();
        });
    };

    var SelectTimeCtrl = function ($scope, $modalInstance, time) {
        $scope.data = {
            time: time
        };

        $scope.ok = function () {
            $modalInstance.close($scope.data.time);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    };
}]);