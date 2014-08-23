'use strict';

//Global service for global variables
angular.module('aurea.system').factory('Global', ['$sessionStorage',
    function ($sessionStorage) {
        var _this = this;

        _this._data = {

            user: {},

            school: {},

            complex: {},

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

            setSchool: function (school) {
                _this._data.school = school;
                $sessionStorage.school = school;
            },

            getSchool: function () {
                return $sessionStorage.school;
            },

            setComplex: function (complex) {
                _this._data.complex = complex;
                $sessionStorage.complex = complex;
            },

            getComplex: function () {
                return $sessionStorage.complex;
            },

            setAcademicYear: function (academicYear) {
                _this._data.academicYear = academicYear;
                $sessionStorage.academicYear = academicYear;
            },

            getAcademicYear: function () {
                return $sessionStorage.academicYear;
            },

            removeComplex: function () {
                delete $sessionStorage.complex;
            },

            removeAcademicYear: function () {
                delete $sessionStorage.academicYear;
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

            getSchoolClass: function () {
                return $sessionStorage.schoolClass;
            },

            removeSchoolClass: function () {
                delete $sessionStorage.schoolClass;
            }
        };

        return _this._data;
    }
]);
