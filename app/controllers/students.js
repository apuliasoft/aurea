'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Student = mongoose.model('Student'),
  User = mongoose.model('User'),
  async = require('async'),
  generatePassword = require('password-generator'),
  _ = require('lodash');


/**
 * Find student by id
 */
var getStudent = function (studentId, complexId, callback) {
    Student.findById(studentId, function (err, student) {
        if (err) return next(err);
        if (!student) return next(new Error('Failed to load student ' + id));
        if (student.complex.toString() !== complexId) return next(new Error('The student ' + studentId + ' is not related to complex ' + complexId));

        callback(student);
    });
};

/**
 * Create an student
 */
exports.create = function (req, res) {
    var student = new Student(req.body);

    var user = new User();
    user.name = student.firstName + ' ' + student.lastName;
    user.email = req.body.email;
    user.role = 'student';

    var password = generatePassword(18, false);
    user.password = password;
    console.log('password generata: ' + password);

    async.waterfall([
        function(callback) {
            user.save(callback)
        },
        function(user, rowAffected, callback) {
            student.user = user._id;
            student.save(callback);
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
 * Update an student
 */
exports.update = function (req, res) {
    getStudent(req.params.studentId, req.params.complexId, function (student) {
        student = _.extend(student, req.body);

        student.save(function (err) {
            if (err) {
                res.jsonp(400, err);
            } else {
                res.jsonp(student);
            }
        });
    });
};

/**
 * Delete an student
 */
exports.destroy = function (req, res) {
    getStudent(req.params.studentId, req.params.complexId, function (student) {
        student.remove(function (err) {
            if (err) {
                res.jsonp(400, err);
            } else {
                res.jsonp(student);
            }
        });
    });
};

/**
 * Show an student
 */
exports.show = function (req, res) {
    getStudent(req.params.studentId, req.params.complexId, function (student) {
        res.jsonp(student);
    });
};

/**
 * List of students
 */
exports.all = function (req, res) {
    Student.find({complex: req.params.complexId}, function (err, student) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(student);
        }
    });
};
