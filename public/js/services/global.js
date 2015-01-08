'use strict';

//Global service for global variables
angular.module('aurea.system')
    .factory('Global', function ($rootScope, $stateParams, $q, _, School, Complex, Teacher, Student, Parent, AcademicYear, SchoolClass, Teaching, Communication, User) {
        var _this = this;

        var users = [];
        var user = null;

        var schools = [];
        var school = null;

        var complexes = [];
        var complex = null;

        var academicYears = [];
        var academicYear = null;

        var students = [];
        var student = null;

        var parents = [];
        var parent = null;

        var teachers = [];
        var teacher = null;

        var schoolClasses = [];
        var schoolClass = null;

        var teachings = [];
        var teaching = null;

        var communications = [];
        var communication = null;

        /**
         * Elimino da Global tutte le variabili di contesto non utili ai fini dell'attuale schermata.
         */
        $rootScope.$on('$stateChangeSuccess', function () {
            if (!$stateParams.userId) {
                users.length = 0;
                user = null;
            }

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

            if (!$stateParams.parentId) {
                parents.length = 0;
                parent = null;
            }

            if (!$stateParams.teacherId) {
                teachers.length = 0;
                teacher = null;
            }

            if (!$stateParams.schoolClassId) {
                schoolClasses.length = 0;
                schoolClass = null;
            }

            if (!$stateParams.teachingId) {
                teachings.length = 0;
                teaching = null;
            }

            if (!$stateParams.communicationId) {
                communications.length = 0;
                communication = null;
            }
        });

        _this._data = {

            user: {},

            isLoggedin: function () {
                return _this._data.user && _this._data.user._id;
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

            getCurrentUser: function () {
                return _this._data.user;
            },

            setCurrentUser: function (newUser) {
                _this._data.user = newUser;
            },

            isItMe: function (user) {
                return  _this._data.user._id === user._id;
            },

            isParentOf: function (student) {
                return _this._data.isParent() && _this._data.user.parent.student === student._id;
            },

            getUsers: function () {
                return users;
            },

            getUser: function () {
                return user;
            },

            setUser: function (userId) {
                var deferred = $q.defer();

                User.query().$promise
                    .then(function (data) {
                        users = data;
                        user = _.find(users, {_id: userId});

                        if (user) {
                            deferred.resolve(user);
                        } else {
                            users.length = 0;
                            deferred.reject();
                        }

                    }, function (err) {
                        deferred.reject(err);
                    });

                return deferred.promise;
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
                        school = _.find(schools, {_id: schoolId});

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
                return complexes;
            },

            getComplex: function () {
                return complex;
            },

            setComplex: function (schoolId, complexId) {
                var deferred = $q.defer();

                Complex.query({schoolId: schoolId}).$promise
                    .then(function (data) {
                        complexes = data;
                        complex = _.find(complexes, {_id: complexId});

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

                Student.query({schoolId: schoolId, complexId: complexId}).$promise
                    .then(function (data) {
                        students = data;
                        student = _.find(students, {_id: studentId});

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

            getParents: function () {
                return parents;
            },

            getParent: function () {
                return parent;
            },

            setParent: function (schoolId, complexId, studentId, parentId) {
                var deferred = $q.defer();

                Parent.query({schoolId: schoolId, complexId: complexId, studentId: studentId}).$promise
                    .then(function (data) {
                        parents = data;
                        parent = _.find(parents, {_id: parentId});

                        if (parent) {
                            deferred.resolve(parent);
                        } else {
                            parents.length = 0;
                            deferred.reject();
                        }

                    }, function (err) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            },

            getTeachers: function () {
                return teachers;
            },

            getTeacher: function () {
                return teacher;
            },

            setTeacher: function (schoolId, complexId, teacherId) {
                var deferred = $q.defer();

                Teacher.query({schoolId: schoolId, complexId: complexId}).$promise
                    .then(function (data) {
                        teachers = data;
                        teacher = _.find(teachers, {_id: teacherId});

                        if (teacher) {
                            deferred.resolve(teacher);
                        } else {
                            teachers.length = 0;
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

                AcademicYear.query({schoolId: schoolId, complexId: complexId}).$promise
                    .then(function (data) {
                        academicYears = data;
                        academicYear = _.find(academicYears, {_id: academicYearId});

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

                SchoolClass.query({schoolId: schoolId, complexId: complexId, academicYearId: academicYearId}).$promise
                    .then(function (data) {
                        schoolClasses = data;
                        schoolClass = _.find(schoolClasses, {_id: schoolClassId});

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

                Teaching.query({
                    schoolId: schoolId,
                    complexId: complexId,
                    academicYearId: academicYearId,
                    schoolClassId: schoolClassId
                }).$promise
                    .then(function (data) {
                        teachings = data;
                        teaching = _.find(teachings, {_id: teachingId});

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
            },

            getCommunications: function () {
                return communications;
            },

            getCommunication: function () {
                return communication;
            },

            setCommunication: function (schoolId, communicationId) {
                var deferred = $q.defer();

                Communication.query({schoolId: schoolId}).$promise
                    .then(function (data) {
                        communications = data;
                        communication = _.find(communications, {_id: communicationId});

                        if (communication) {
                            deferred.resolve(communication);
                        } else {
                            communications.length = 0;
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
