'use strict';

angular.module('aurea.schoolClasses').controller('SchoolClassesCtrl', ['$scope', '$stateParams', '$location', '$filter', '_', 'Global', 'SchoolClass', 'AcademicYear', 'Student', 'ClassStudent', function ($scope, $stateParams, $location, $filter, _, Global, SchoolClass, AcademicYear, Student, ClassStudent) {
    $scope.global = Global;

    $scope.goToListSchoolClasses = function () {
        $location.path('classi');
    };

    $scope.goToCreateSchoolClass = function () {
        $location.path('classi/crea');
    };

    $scope.goToEditSchoolClass = function (schoolClass) {
        if (schoolClass) {
            $location.path('classi/' + schoolClass._id);
        }
    };

    $scope.goToClassRegistry = function (schoolClass) {
        if (schoolClass) {
            Global.setSchoolClass(schoolClass);
            $location.path('registri-di-classe/' + $filter('date')(new Date(), 'yyyy-MM-dd'));
        }
    };

    $scope.init = function () {
        $scope.schoolClass = new SchoolClass({
            academicYear: Global.getAcademicYear()._id,
            complex: Global.getComplex()._id,
            school: Global.getSchool()._id
        });

        $scope.chosableStudents = Student.query({
            complexId: Global.getComplex()._id,
            schoolId: Global.getSchool()._id
        });
        $scope.chosenStudents = [];
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
        $scope.schoolClasses = SchoolClass.query({
            schoolId: Global.getSchool()._id,
            complexId: Global.getComplex()._id,
            academicYearId: Global.getAcademicYear()._id
        });
    };

    $scope.findOne = function () {
        $scope.schoolClass = SchoolClass.get({
            schoolClassId: $stateParams.schoolClassId,
            schoolId: Global.getSchool()._id,
            complexId: Global.getComplex()._id,
            academicYearId: Global.getAcademicYear()._id
        });

        $scope.schoolClass.$promise.then(function () {
            $scope.classStudents = ClassStudent.query({
                schoolClassId: $scope.schoolClass._id,
                complexId: Global.getComplex()._id,
                schoolId: Global.getSchool()._id,
                academicYearId: Global.getAcademicYear()._id
            });

            $scope.classStudents.$promise.then(function () {

                $scope.chosableStudents = Student.query({
                    complexId: Global.getComplex()._id,
                    schoolId: Global.getSchool()._id
                });

                $scope.chosableStudents.$promise.then(function () {

                    $scope.chosenStudents = _.filter($scope.chosableStudents, function (student) {
                        return _.contains($scope.schoolClass.students, student._id);
                    });

                    $scope.chosableStudents = _.difference($scope.chosableStudents, $scope.chosenStudents);
                });
            });
        });
    };
}]);


























