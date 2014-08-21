'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Teacher = mongoose.model('Teacher'),
    User = mongoose.model('User'),
    async = require('async'),
    generatePassword = require('password-generator'),
    _ = require('lodash');


/**
 * Find teacher by id
 */

/**
 * Find student by id
 */
var getTeacher = function (teacherId, complexId, callback) {
    Teacher.findById(teacherId, function (err, teacher) {
        if (err) return next(err);
        if (!teacher) return next(new Error('Failed to load teacher ' + teacherId));
        if (teacher.complex.toString() !== complexId) return next(new Error('The teacher ' + teacherId + ' is not related to complex ' + complexId));

        callback(teacher);
    });
};

/**
 * Create an teacher 
 */
exports.create = function(req, res) {

    var teacher = new Teacher(req.body);

    var user = new User();
    user.name = teacher.firstName + ' ' + teacher.lastName;
    user.email = req.body.email;
    user.role = 'teacher';

    var password = generatePassword(18, false);
    user.password = password;
    console.log('password generata: ' + password);

    async.waterfall([
          function(callback) {
              user.save(callback)
          },
          function(user, rowAffected, callback) {
              teacher.user = user._id;
              teacher.save(callback);
          }
      ],
      function (err, result) {
          // the results array will equal ['one','two'] even though
          // the second function had a shorter timeout.
          console.log(err);
          console.log(result);

          if (err) {
              res.jsonp(400, err);
          } else {
              res.jsonp(result);
          }
      });
};

/**
 * Update an teacher 
 */
exports.update = function(req, res) {
    getTeacher(req.params.teacherId, req.params.complexId, function (teacher) {
        teacher = _.extend(teacher, req.body);

        teacher.save(function (err) {
            if (err) {
                res.jsonp(400, err);
            } else {
                res.jsonp(teacher);
            }
        });
    });
};

/**
 * Delete an teacher 
 */
exports.destroy = function(req, res) {
    getTeacher(req.params.teacherId, req.params.complexId, function (teacher) {
        teacher.remove(function (err) {
            if (err) {
                res.jsonp(400, err);
            } else {
                res.jsonp(teacher);
            }
        });
    });
};

/**
 * Show an teacher 
 */
exports.show = function(req, res) {
    getTeacher(req.params.teacherId, req.params.complexId, function (teacher) {
        res.jsonp(teacher);
    });
};

/**
 * List of teachers
 */
exports.all = function(req, res) {
    Teacher.find({complex: req.params.complexId}, function(err, teacher) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(teacher);
        }
    });
};
