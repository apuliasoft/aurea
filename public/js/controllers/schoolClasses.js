'use strict';

angular.module('aurea.schoolClasses')
    .controller('SchoolClassesCtrl', function ($scope, $state, $stateParams, SmartState, $filter, _, Global, SchoolClass, Student) {
        $scope.global = Global;

        $scope.goToListSchoolClasses = function () {
            SmartState.go('all school classes');
        };

        $scope.goToCreateSchoolClass = function () {
            SmartState.go('create school class');
        };

        $scope.goToEditSchoolClass = function (schoolClass) {
            SmartState.go('edit school class', { schoolClassId: schoolClass._id });
        };

        $scope.goToTeachings = function (schoolClass) {
            SmartState.go('all teachings', { schoolClassId: schoolClass._id });
        };

        $scope.goToClassStudents = function (schoolClass) {
            SmartState.go('all class students', { schoolClassId: schoolClass._id });
        };

        $scope.goToClassRegistry = function (schoolClass) {
            SmartState.go('class registry by date', {
                schoolClassId: schoolClass._id,
                date: $filter('date')(new Date(), 'yyyy-MM-dd')
            });
        };

        $scope.find = function () {
            SchoolClass.query({
                schoolId: Global.getSchool()._id,
                complexId: Global.getComplex()._id,
                academicYearId: Global.getAcademicYear()._id
            }).$promise
                .then(function (schoolClasses) {
                    $scope.schoolClasses = schoolClasses;
                });
        };

        $scope.init = function () {
            $scope.editMode = $state.current.data.editMode;
            if ($state.current.data.editMode) {
                $scope.title = 'Modifica classe';
                findOne();
            } else {
                $scope.title = 'Nuova classe';
                prepare();
            }
        };

        $scope.save = function (isValid) {
            if (isValid) {
                var schoolClass = $scope.schoolClass;
                if ($state.current.data.editMode) {
                    update(schoolClass);
                } else {
                    create(schoolClass);
                }
            }
        };

        $scope.remove = function (schoolClass) {
            if (schoolClass) {
                schoolClass.$remove();
                _.remove($scope.schoolClasses, schoolClass);
                $scope.goToListSchoolClasses();
            }
        };

        $scope.addStudent = function (student) {
            $scope.chosenStudents.push(student);
            $scope.chosableStudents = _.without($scope.chosableStudents, student);
        };

        $scope.removeStudent = function (student) {
            $scope.chosableStudents.push(student);
            $scope.chosenStudents = _.without($scope.chosenStudents, student);
        };

        var prepare = function () {
            $scope.schoolClass = new SchoolClass({
                academicYear: Global.getAcademicYear()._id,
                complex: Global.getComplex()._id,
                school: Global.getSchool()._id
            });
            $scope.chosenStudents = [];

            Student.query({
                complexId: Global.getComplex()._id,
                schoolId: Global.getSchool()._id
            }).$promise
                .then(function (students) {
                    $scope.chosableStudents = students;
                });
        };

        var findOne = function () {
            SchoolClass.get({
                schoolClassId: $stateParams.schoolClassId,
                schoolId: Global.getSchool()._id,
                complexId: Global.getComplex()._id,
                academicYearId: Global.getAcademicYear()._id
            }).$promise
                .then(function (schoolClass) {
                    $scope.schoolClass = schoolClass;

                    Student.query({
                        complexId: Global.getComplex()._id,
                        schoolId: Global.getSchool()._id
                    }).$promise
                        .then(function (students) {
                            $scope.chosenStudents = _.filter(students, function (student) {
                                return _.contains($scope.schoolClass.students, student._id);
                            });

                            $scope.chosableStudents = _.difference(students, $scope.chosenStudents);
                        });
                });
        };

        var create = function (schoolClass) {
            schoolClass.students = _.map($scope.chosenStudents, function (student) {
                return student._id;
            });

            console.log(schoolClass);

            schoolClass.$save(function (response) {
                $scope.goToListSchoolClasses(response);
            });
        };

        var update = function (schoolClass) {
            if (!schoolClass.updated) {
                schoolClass.updated = [];
            }
            schoolClass.updated.push(new Date().getTime());
            schoolClass.students = _.map($scope.chosenStudents, function (student) {
                return student._id;
            });

            schoolClass.$update(function (response) {
                $scope.goToListSchoolClasses(response);
            });
        };
    });


























