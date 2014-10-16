'use strict';

//Global service for global variables
angular.module('aurea.system')
    .factory('Global', function ($rootScope, $stateParams, $q, _, School, Complex, Student, AcademicYear, SchoolClass, Teaching) {
        var _this = this;

        var schools = [];
        var school = null;

        var complexes = [];
        var complex = null;

        var academicYears = [];
        var academicYear = null;

        var students = [];
        var student = null;

        var schoolClasses = [];
        var schoolClass = null;

        var teachings = [];
        var teaching = null;

        /**
         * Elimino da Global tutte le variabili di contesto non utili ai fini dell'attuale schermata.
         */
        $rootScope.$on('$stateChangeSuccess', function () {
            if (!$stateParams.schoolId) {
                schools.length = 0;
                school = null;
            }

            if (!$stateParams.complexId) {
                complexes.length = 0;
                complex = null;
            }

            if (!$stateParams.academicYearId) {
                academicYears.length = 0;
                academicYear = null;
            }

            if (!$stateParams.studentId) {
                students.length = 0;
                student = null;
            }

            if (!$stateParams.schoolClassId) {
                schoolClasses.length = 0;
                schoolClass = null;
            }

            if (!$stateParams.teachingId) {
                teachings.length = 0;
                teaching = null;
            }

        });

        $rootScope.$on('$locationChangeSuccess',
            function () {
                _this._data.title = '';
                _this._data.subtitle = '';
            });

        _this._data = {

            user: {},

            title: 'Aurea',

            subtitle: '',

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

            setSchool: function (schoolId) {
                var deferred = $q.defer();

                School.query().$promise
                    .then(function (data) {
                        schools = data;
                        school = _.find(schools, { _id: schoolId });

                        if (school) {
                            deferred.resolve(school);
                        } else {
                            schools.length = 0;
                            deferred.reject();
                        }

                    }, function (err) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            },

            getComplexes: function () {
                return  complexes;
            },

            getComplex: function () {
                return complex;
            },

            setComplex: function (schoolId, complexId) {
                var deferred = $q.defer();

                Complex.query({ schoolId: schoolId }).$promise
                    .then(function (data) {
                        complexes = data;
                        complex = _.find(complexes, { _id: complexId });

                        if (complex) {
                            deferred.resolve(complex);
                        } else {
                            complexes.length = 0;
                            deferred.reject();
                        }

                    }, function (err) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            },

            getStudents: function () {
                return students;
            },

            getStudent: function () {
                return student;
            },

            setStudent: function (schoolId, complexId, studentId) {
                var deferred = $q.defer();

                Student.query({ schoolId: schoolId, complexId: complexId }).$promise
                    .then(function (data) {
                        students = data;
                        student = _.find(students, { _id: studentId });

                        if (student) {
                            deferred.resolve(student);
                        } else {
                            students.length = 0;
                            deferred.reject();
                        }

                    }, function (err) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            },

            getAcademicYears: function () {
                return academicYears;
            },

            getAcademicYear: function () {
                return academicYear;
            },

            setAcademicYear: function (schoolId, complexId, academicYearId) {
                var deferred = $q.defer();

                AcademicYear.query({ schoolId: schoolId, complexId: complexId }).$promise
                    .then(function (data) {
                        academicYears = data;
                        academicYear = _.find(academicYears, { _id: academicYearId });

                        if (academicYear) {
                            deferred.resolve(academicYear);
                        } else {
                            academicYears.length = 0;
                            deferred.reject();
                        }

                    }, function (err) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            },

            getSchoolClasses: function () {
                return schoolClasses;
            },

            getSchoolClass: function () {
                return schoolClass;
            },

            setSchoolClass: function (schoolId, complexId, academicYearId, schoolClassId) {
                var deferred = $q.defer();

                SchoolClass.query({ schoolId: schoolId, complexId: complexId, academicYearId: academicYearId }).$promise
                    .then(function (data) {
                        schoolClasses = data;
                        schoolClass = _.find(schoolClasses, { _id: schoolClassId });

                        if (schoolClass) {
                            deferred.resolve(schoolClass);
                        } else {
                            schoolClasses.length = 0;
                            deferred.reject();
                        }

                    }, function (err) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            },

            getTeachings: function () {
                return teachings;
            },

            getTeaching: function () {
                return teaching;
            },

            setTeaching: function (schoolId, complexId, academicYearId, schoolClassId, teachingId) {
                var deferred = $q.defer();

                Teaching.query({ schoolId: schoolId, complexId: complexId, academicYearId: academicYearId, schoolClassId: schoolClassId }).$promise
                    .then(function (data) {
                        teachings = data;
                        teaching = _.find(teachings, { _id: teachingId });

                        if (teaching) {
                            deferred.resolve(teaching);
                        } else {
                            teachings.length = 0;
                            deferred.reject();
                        }

                    }, function (err) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            }
        };

        return _this._data;
    });
