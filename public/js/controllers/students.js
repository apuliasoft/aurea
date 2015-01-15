'use strict';

angular.module('aurea.students')
    .controller('StudentsCtrl', function ($scope, $state, $stateParams, $mdToast, _, SmartState, Global, Student) {
        $scope.global = Global;

        $scope.goToListStudents = function () {
            SmartState.go('all students');
        };

        $scope.goToCreateStudent = function () {
            SmartState.go('create student');
        };

        $scope.goToEditStudent = function (student) {
            SmartState.go('edit student', { studentId: student._id });
        };

        $scope.goToListParents = function (student) {
            SmartState.go('all parents', { studentId: student._id });
        };

        $scope.isItMe = function (student) {
            return student.user._id === Global.getCurrentUser()._id;
        };

        $scope.find = function () {
            Student.query({
                complexId: Global.getComplex()._id,
                schoolId: Global.getSchool()._id
            }).$promise
                .then(function (students) {
                    $scope.students = students;
                });
        };

        $scope.init = function () {
            $scope.editMode = $state.current.data.editMode;
            if ($state.current.data.editMode) {
                $scope.title = 'Modifica alunno';
                findOne();
            } else {
                $scope.title = 'Nuovo alunno';
                prepare();
            }
        };

        $scope.save = function (isValid) {
            if (isValid) {
                var student = serializeData($scope.student);
                if ($state.current.data.editMode) {
                    update(student);
                } else {
                    create(student);
                }
            }
        };

        $scope.remove = function (student) {
            if (student) {
                student.$remove(function() {
                    _.remove($scope.students, student);
                    $mdToast.show({
                        template: '<md-toast>Alunno cancellato</md-toast>',
                        hideDelay: 2000
                    });
                });
            }
        };

        var prepare = function () {
            $scope.student = new Student({
                complex: Global.getComplex()._id,
                school: Global.getSchool()._id
            });
        };

        var findOne = function () {
            Student.get({
                studentId: $stateParams.studentId,
                complexId: Global.getComplex()._id,
                schoolId: Global.getSchool()._id
            }).$promise
                .then(function (student) {
                    $scope.student = deserializeData(student);
                });
        };

        var create = function (student) {
                student.$save(function () {
                    $scope.goToListStudents();
                    $mdToast.show({
                        template: '<md-toast>Alunno creato</md-toast>',
                        hideDelay: 2000
                    });
                });
        };

        var update = function (student) {
                if (!student.updated) {
                    student.updated = [];
                }
                student.updated.push(new Date().getTime());

                student.$update(function () {
                    $scope.goToListStudents();
                    $mdToast.show({
                        template: '<md-toast>Alunno aggiornato</md-toast>',
                        hideDelay: 2000
                    });
                });
        };

        /**
         * Converte il formato della data di nascita.
         * @param academicYear
         */
        var serializeData = function (student) {
            var result = _.cloneDeep(student);
            return new Student(result);
        };

        /**
         * Converte il formato della data di nascita.
         * @param academicYear
         */
        var deserializeData = function (student) {
            student.birthDate = new Date(student.birthDate);
            return student;
        };
    });
