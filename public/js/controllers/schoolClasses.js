'use strict';

angular.module('aurea.schoolClasses').controller('SchoolClassesCtrl', ['$scope', '$stateParams', 'SmartState', '$filter', '_', 'Global', 'SchoolClass', 'Student', function ($scope, $stateParams, SmartState, $filter, _, Global, SchoolClass, Student) {
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

    $scope.goToClassRegistry = function (schoolClass) {
        SmartState.go('class registry by date', {
            schoolClassId: schoolClass._id,
            date: $filter('date')(new Date(), 'yyyy-MM-dd')
        });
    };

    $scope.init = function () {
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
            .then(function(students) {
                Global.title = 'Classi';
                Global.subtitle = 'Nuova';

                $scope.chosableStudents = students;
            });
    };

    $scope.addStudent = function (student) {
        $scope.chosenStudents.push(student);
        $scope.chosableStudents = _.without($scope.chosableStudents, student);
    };

    $scope.removeStudent = function (student) {
        $scope.chosableStudents.push(student);
        $scope.chosenStudents = _.without($scope.chosenStudents, student);
    };

    $scope.create = function (isValid) {
        if (isValid) {
            var schoolClass = $scope.schoolClass;
            schoolClass.students = _.map($scope.chosenStudents, function (student) {
                return student._id;
            });

            console.log(schoolClass);

            schoolClass.$save(function (response) {
                $scope.goToListSchoolClasses(response);
            });
        }
    };

    $scope.update = function (isValid) {
        if (isValid) {
            var schoolClass = $scope.schoolClass;
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
        }
    };

    $scope.remove = function (schoolClass) {
        if (schoolClass) {
            schoolClass.$remove();
            _.remove($scope.schoolClasses, schoolClass);
            $scope.goToListSchoolClasses();
        }
    };

    $scope.find = function () {
        SchoolClass.query({
            schoolId: Global.getSchool()._id,
            complexId: Global.getComplex()._id,
            academicYearId: Global.getAcademicYear()._id
        }).$promise
            .then(function (schoolClasses) {
                Global.title = 'Classi';
                Global.subtitle = Global.getAcademicYear().name;

                $scope.schoolClasses = schoolClasses;
            });
    };

    $scope.findOne = function () {
        SchoolClass.get({
            schoolClassId: $stateParams.schoolClassId,
            schoolId: Global.getSchool()._id,
            complexId: Global.getComplex()._id,
            academicYearId: Global.getAcademicYear()._id
        }).$promise
            .then(function (schoolClass) {
                Global.title = 'Classi';
                Global.subtitle = schoolClass.name;

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
}]);


























