'use strict';

//Global service for global variables
angular.module('aurea.system').factory('Global', ['$sessionStorage', 'School', 'Complex',
    function ($sessionStorage, School, Complex) {
        var _this = this;

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
                resetComplexes();
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
        };

        var setCurrentComplex = function () {
            var complexId = _this._data.getUser().complex || $sessionStorage.complexId;

            if (!complexId)
                return;

            complex = _.find(complexes, {_id: complexId});
            if (complex) {
                ;//initAcademicYears(schoolId, complexId);
            }
        };

        var initComplexes = function (schoolId) {
            if (complexes.length === 0) {
                Complex.query({schoolId: schoolId}, function (data) {
                    complexes = data;
                    setCurrentComplex();
                });
            } else {
                setCurrentComplex();
            }
        };

        _this._data = {

            user: {},

            academicYear: {},

            student: {},

            schoolClass: {},

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
                if (!_.isEqual(_this._data.user, newUser)) {
                    resetSchools();
                    _this._data.user = newUser;
                    initSchools();
                }
            },

            getSchools: function () {
                return schools;
            },

            getSchool: function () {
                return school;
            },

            setSchool: function (school) {
                $sessionStorage.schoolId = school._id;
                setCurrentSchool();
            },

            removeSchool: function () {
                delete $sessionStorage.schoolId;
            },

            getComplexes: function () {
                return  complexes;
            },

            getComplex: function () {
                return complex;
            },

            setComplex: function (complex) {
                $sessionStorage.complexId = complex._id;
                setCurrentComplex();
            },

            getAcademicYear: function () {
                return $sessionStorage.academicYear;
            },

            setAcademicYear: function (academicYear) {
                _this._data.academicYear = academicYear;
                $sessionStorage.academicYear = academicYear;
            },

            removeAcademicYear: function () {
                _this._data.academicYear = {};
                delete $sessionStorage.academicYear;
            },

            getSchoolClass: function () {
                return $sessionStorage.schoolClass;
            },

            setStudent: function (student) {
                _this._data.student = student;
                $sessionStorage.student = student;
            },

            getStudent: function () {
                return $sessionStorage.student;
            },

            removeStudent: function () {
                delete $sessionStorage.student;
            },

            setSchoolClass: function (schoolClass) {
                _this._data.schoolClass = schoolClass;
                $sessionStorage.schoolClass = schoolClass;
            },

            removeSchoolClass: function () {
                _this._data.schoolClass = {};
                delete $sessionStorage.schoolClass;
            }
        };

        return _this._data;
    }
])
;
