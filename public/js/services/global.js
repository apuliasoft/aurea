'use strict';

//Global service for global variables
angular.module('aurea.system').factory('Global', [
    function() {
        var _this = this;
        _this._data = {

            user: {},

            isLoggedin: function() {
                return this.user && this.user._id;
            },

            isAdmin: function() {
                return _this._data.isLoggedin() && _this._data.user.role === 'admin';
            },

            isManager: function() {
                return _this._data.isLoggedin() && _this._data.user.role === 'manager';
            },

            isTeacher: function() {
                return _this._data.isLoggedin() && _this._data.user.role === 'teacher';
            },

            isStudent: function() {
                return _this._data.isLoggedin() && _this._data.user.role === 'student';
            },

            isParent: function() {
                return _this._data.isLoggedin() && _this._data.user.role === 'parent';
            }

        };

        return _this._data;
    }
]);
