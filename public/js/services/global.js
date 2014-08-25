'use strict';

//Global service for global variables
angular.module('aurea.system').factory('Global', ['$sessionStorage', '$rootScope', 'School', 'Complex', 'AcademicYear', 'SchoolClass',
    function ($sessionStorage, $rootScope, School, Complex, AcademicYear, SchoolClass) {
        var _this = this;

        $rootScope.$on('$locationChangeSuccess',
            function(){
                _this._data.title = '';
                _this._data.subtitle = '';
                _this._data.actions = [];
            });

        // ############# SCHOOL #############
        var schools = [];
        var school = {};

        var resetSchools = function () {
            schools = [];
            school = {};
            delete $sessionStorage.schoolId;
            resetComplexes();
        };

        var setCurrentSchool = function () {
            var schoolId = _this._data.getUser().school || $sessionStorage.schoolId;

            if (!schoolId)
                return;

            school = _.find(schools, {_id: schoolId});
            if (school) {
                initComplexes(schoolId);
            }
        };

        var initSchools = function () {
            if (schools.length === 0) {
                School.query({}, function (data) {
                    schools = data;
                    setCurrentSchool();
                });
            } else {
                setCurrentSchool();
            }
        };

        // ############# COMPLEX #############
        var complexes = [];
        var complex = {};

        var resetComplexes = function () {
            complexes = [];
            complex = {};
            delete $sessionStorage.complexId;
            resetAcademicYears();
        };

        var setCurrentComplex = function () {
            var complexId = _this._data.getUser().complex || $sessionStorage.complexId;

            if (!complexId)
                return;

            complex = _.find(complexes, {_id: complexId});
            if (complex) {
                initAcademicYears();
            }
        };

        var initComplexes = function () {
            if (complexes.length === 0) {
                Complex.query({schoolId: $sessionStorage.schoolId}, function (data) {
                    complexes = data;
                    setCurrentComplex();
                });
            } else {
                setCurrentComplex();
            }
        };

        // ############# ACADEMIC YEAR #############
        var academicYears = [];
        var academicYear = {};

        var resetAcademicYears = function () {
            academicYears = [];
            academicYear = {};
            delete $sessionStorage.academicYearId;
            resetSchoolClasses();
        };

        var setCurrentAcademicYear = function () {
            if (!$sessionStorage.academicYearId)
                return;

            academicYear = _.find(academicYears, {_id: $sessionStorage.academicYearId});
            if (academicYear) {
                initSchoolClasses();
            }
        };

        var initAcademicYears = function () {
            if (academicYears.length === 0) {
                AcademicYear.query({
                    schoolId: $sessionStorage.schoolId,
                    complexId: $sessionStorage.complexId
                }, function (data) {
                    academicYears = data;
                    setCurrentAcademicYear();
                });
            } else {
                setCurrentAcademicYear();
            }
        };

        // ############# SCHOOL CLASS #############
        var schoolClasses = [];
        var schoolClass = {};

        var resetSchoolClasses = function () {
            schoolClasses = [];
            schoolClass = {};
            delete $sessionStorage.schoolClassId;
        };

        var setCurrentSchoolClass = function () {
            if (!$sessionStorage.schoolClassId)
                return;

            schoolClass = _.find(schoolClasses, {_id: $sessionStorage.schoolClassId});
        };

        var initSchoolClasses = function () {
            if (schoolClasses.length === 0) {
                SchoolClass.query({
                    schoolId: $sessionStorage.schoolId,
                    complexId: $sessionStorage.complexId,
                    academicYearId: $sessionStorage.academicYearId
                }, function (data) {
                    schoolClasses = data;
                    setCurrentSchoolClass();
                });
            } else {
                setCurrentSchoolClass();
            }
        };

        _this._data = {

            user: {},

            title: 'Aurea',

            subtitle: '',

            actions: [],

            student: {},

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
                if (_.isEmpty(newUser)) {
                    resetSchools();
                }

                _this._data.user = newUser;
                initSchools();
            },

            getSchools: function () {
                return schools;
            },

            getSchool: function () {
                return school;
            },

            setSchool: function (school) {
                if (school._id === $sessionStorage.schoolId)
                    return;

                resetComplexes();
                $sessionStorage.schoolId = school._id;
                setCurrentSchool();
            },

            setSchool2: function (newSchool) {
                school = newSchool;
            },

            getComplexes: function () {
                return  complexes;
            },

            getComplex: function () {
                return complex;
            },

            setComplex: function (complex) {
                if (complex._id === $sessionStorage.complexId)
                    return;

                resetAcademicYears();
                $sessionStorage.complexId = complex._id;
                setCurrentComplex()
            },

            getAcademicYears: function () {
                return academicYears;
            },

            getAcademicYear: function () {
                return academicYear;
            },

            setAcademicYear: function (academicYear) {
                if (academicYear._id === $sessionStorage.academicYearId)
                    return;

                resetSchoolClasses();
                $sessionStorage.academicYearId = academicYear._id;
                setCurrentAcademicYear()
            },

            getSchoolClasses: function () {
                return schoolClasses;
            },

            getSchoolClass: function () {
                return schoolClass;
            },

            setSchoolClass: function (schoolClass) {
                $sessionStorage.schoolClassId = schoolClass._id;
                setCurrentSchoolClass();
            },



            //FIXME gestire meglio lo studente
            setStudent: function (student) {
                _this._data.student = student;
                $sessionStorage.student = student;
            },

            getStudent: function () {
                return $sessionStorage.student;
            },

            removeStudent: function () {
                delete $sessionStorage.student;
            }
        };

        return _this._data;
    }
])
;
