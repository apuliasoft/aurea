'use strict';

angular.module('aurea.classRegistry').controller('ClassRegistryCtrl', ['$scope', '$stateParams', '$filter', '_', '$modal', 'SmartState', 'Global', 'ClassRegistry', 'ClassStudent', 'Teacher', 'Teaching', function ($scope, $stateParams, $filter, _, $modal, SmartState, Global, ClassRegistry, ClassStudent, Teacher, Teaching) {

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
        //var weekDay = date.getDay() === 0 ? 7 : date.getDay();

        /*var day = _.find(Global.getAcademicYear().timeTable, function (day) {
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
            date: date.toISOString(),
            school: school,
            complex: complex,
            academicYear: academicYear,

            slots: slots,
            absences: [],
            earlyLeaves: [],
            lateEntrances: []
        });*/

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

        //classRegistry._classId = $stateParams.classId;
        // TODO: durante l'update è già iso string
        classRegistry._date = classRegistry.date; //.toISOString()

        classRegistry.$update(function () {
            classRegistry = deserializeData(classRegistry);
        });
    };

    // UTILITY FUNCTIONS

    $scope.toggleStudentSelection = function (student) {

        $scope.classStudents = _.map($scope.classStudents, function (classStudent) {
            if (student._id === classStudent._id) {
                return _.extend({}, classStudent, {selected: !classStudent.selected});
            } else {
                return classStudent;
            }
        });
    };

    $scope.isValidEntranceSelection = function(){
        var selectedStudents = _.chain($scope.classStudents)
          .filter(function (classStudent) {
              return classStudent.selected;
          })
          .map(function (selectedStudent) {
              return selectedStudent._id;
          })
          .value();

        return selectedStudents.length === 1;
          /*&& _.every($scope.classRegistry.lateEntrances, function(lateEntrance){
              return lateEntrance.student !== selectedStudents[0];
          });*/
    };

    $scope.isValidLeaveSelection = function(){
        var selectedStudents = _.chain($scope.classStudents)
          .filter(function (classStudent) {
              return classStudent.selected;
          })
          .map(function (selectedStudent) {
              return selectedStudent._id;
          })
          .value();

        return selectedStudents.length === 1;
          /*&& _.every($scope.classRegistry.earlyLeaves, function(earlyLeave){
              return earlyLeave.student !== selectedStudents[0];
          });*/
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
        var student = _.find($scope.classStudents, function(student){
            return student.selected;
        })._id;

        var time = _.find($scope.classRegistry.earlyLeaves, function(earlyLeave){
            return earlyLeave.student === student;
        });

        time = time ? time.timestamp : null;

        var modalInstance = $modal.open({
            templateUrl: 'selectTime.html',
            controller: SelectTimeCtrl,
            size: 'sm',
            resolve: {
                time: function(){
                    return time;
                }
            }
        });

        modalInstance.result.then(function (leaveTime) {
            var selectedStudent = _.find($scope.classStudents, function(student){
                return student.selected;
            })._id;

//            var classStudent = _.find($scope.classStudents, function(classStudent){
//                return classStudent._id === selectedStudent;
//            });

            if(leaveTime){

                $scope.classRegistry.earlyLeaves.push({
                    student: selectedStudent,
                    timestamp: leaveTime
                });

//                _.extend(classStudent, {
//                    earlyLeave: $filter('time')(timestamp)
//                });

            } else {
                var earlyLeave = _.find($scope.classRegistry.earlyLeaves, function(earlyLeave){
                    return earlyLeave.student === selectedStudent;
                });
                _.remove($scope.classRegistry.earlyLeaves, earlyLeave);
            }
            $scope.clearSelection();
        });
    };

    $scope.addLateEntrance = function () {

        var student = _.find($scope.classStudents, function(student){
            return student.selected;
        })._id;

        var time = _.find($scope.classRegistry.lateEntrances, function(lateEntrance){
            return lateEntrance.student === student;
        });

        time = time ? time.timestamp : null;

        var modalInstance = $modal.open({
            templateUrl: 'selectTime.html',
            controller: SelectTimeCtrl,
            size: 'sm',
            resolve: {
                time: function(){
                    return time;
                }
            }
        });

        modalInstance.result.then(function (entranceTime) {
            var selectedStudent = _.find($scope.classStudents, function(student){
                return student.selected;
            })._id;

//            var classStudent = _.find($scope.classStudents, function(classStudent){
//                return classStudent._id === selectedStudent;
//            });

            if(entranceTime){

                $scope.classRegistry.lateEntrances.push({
                    student: selectedStudent,
                    timestamp: entranceTime
                });

//                _.extend(classStudent, {
//                    lateEntrance: $filter('time')(timestamp)
//                });


            } else {
                var lateEntrance = _.find($scope.classRegistry.lateEntrances, function(lateEntrance){
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