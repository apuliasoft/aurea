'use strict';

//Global service for global variables
angular.module('aurea.system').factory('Global', ['$sessionStorage',
    function ($sessionStorage) {
        var _this = this;

        _this._data = {

            user: {},

            complex: {},

            academicYear: {},

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

            removeAcademicYear: function () {
                delete $sessionStorage.academicYear;
            }
        };

        return _this._data;
    }
]);
