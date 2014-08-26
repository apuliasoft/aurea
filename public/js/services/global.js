'use strict';

//Global service for global variables
angular.module('aurea.system').factory('Global', ['$sessionStorage', '$rootScope', '$stateParams', '_', 'School', 'Complex', 'Student', 'AcademicYear', 'SchoolClass',
    function ($sessionStorage, $rootScope, $stateParams, _, School, Complex, Student, AcademicYear, SchoolClass) {
        var _this = this;

        var schools = [];
        var school = {};

        var complexes = [];
        var complex = {};

        var academicYears = [];
        var academicYear = {};

        var schoolClasses = [];
        var schoolClass = {};

        var students = [];
        var student = {};

        /**
         * Elimino da Global tutte le variabili di contesto non utili ai fini dell'attuale schermata.
         */
        $rootScope.$on('$stateChangeSuccess', function () {
            if (!$stateParams.schoolId) {
                schools = [];
                school = {};
            }

            if (!$stateParams.complexId) {
                complexes = [];
                complex = {};
            }

            if (!$stateParams.academicYearId) {
                academicYears = [];
                academicYear = {};
            }

        });

        $rootScope.$on('$locationChangeSuccess',
            function(){
                _this._data.title = '';
                _this._data.subtitle = '';
                _this._data.actions = [];
            });

        _this._data = {

            user: {},

            title: 'Aurea',

            subtitle: '',

            actions: [],

            isLoggedin: function () {
                return this.user && this.user._id;
            },

            isAdmin: function () {
                return _this._data.isLoggedin() && _this._data.user.role === 'admin';
            },

            isManager: function () {
                return _this._data.isLoggedin() && _this._data.user.role === 'manager';
            },

            isTeacher: function () {
                return _this._data.isLoggedin() && _this._data.user.role === 'teacher';
            },

            isStudent: function () {
                return _this._data.isLoggedin() && _this._data.user.role === 'student';
            },

            isParent: function () {
                return _this._data.isLoggedin() && _this._data.user.role === 'parent';
            },

            getUser: function () {
                return _this._data.user;
            },

            setUser: function (newUser) {
                _this._data.user = newUser;
            },

            getSchools: function () {
                return schools;
            },

            getSchool: function () {
                return school;
            },

            setSchool: function (schoolId, done, fail) {
                School.query({}, function (data) {
                    schools = data;
                    school = _.find(schools, { _id: schoolId });

                    if (school) {
                        done(school);
                    } else {
                        schools = [];
                        fail();
                    }

                }, function (err) {
                    fail(err);
                });
            },

            getComplexes: function () {
                return  complexes;
            },

            getComplex: function () {
                return complex;
            },

            setComplex: function (schoolId, complexId, done, fail) {
                Complex.query({ schoolId: schoolId }, function (data) {
                    complexes = data;
                    complex = _.find(complexes, { _id: complexId });

                    if (complex) {
                        done(complex);
                    } else {
                        complexes = [];
                        fail();
                    }

                }, function (err) {
                    fail(err);
                });
            },

            getAcademicYears: function () {
                return academicYears;
            },

            getAcademicYear: function () {
                return academicYear;
            },

            setAcademicYear: function (schoolId, complexId, academicYearId, done, fail) {
                AcademicYear.query({ schoolId: schoolId, complexId: complexId }, function (data) {
                    academicYears = data;
                    academicYear = _.find(academicYears, { _id: academicYearId });

                    if (academicYear) {
                        done(academicYear);
                    } else {
                        academicYears = [];
                        fail();
                    }

                }, function (err) {
                    fail(err);
                });
            },

            getSchoolClasses: function () {
                return schoolClasses;
            },

            getSchoolClass: function () {
                return schoolClass;
            },

            setSchoolClass: function (schoolId, complexId, academicYearId, schoolClassId, done, fail) {
                SchoolClass.query({ schoolId: schoolId, complexId: complexId, academicYearId: academicYearId }, function (data) {
                    schoolClasses = data;
                    schoolClass = _.find(schoolClasses, { _id: schoolClassId });

                    if (schoolClass) {
                        done(schoolClass);
                    } else {
                        schoolClasses = [];
                        fail();
                    }

                }, function (err) {
                    fail(err);
                });
            },

            getStudent: function () {
                return student;
            },

            setStudent: function (schoolId, complexId, studentId, done, fail) {
                Student.query({ schoolId: schoolId, complexId: complexId }, function (data) {
                    students = data;
                    student = _.find(students, { _id: studentId });

                    if (student) {
                        done(student);
                    } else {
                        students = [];
                        fail();
                    }

                }, function (err) {
                    fail(err);
                });
            }
        };

        return _this._data;
    }
])
;
