'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Student = mongoose.model('Student'),
  User = mongoose.model('User'),
  Complex = mongoose.model('Complex'),
  async = require('async'),
  generatePassword = require('password-generator'),
  _ = require('lodash');


/**
 * Find student by id
 */
//var getStudent = function (studentId, callback) {
//    Student.findById(studentId, function (err, student) {
//        if (err) return callback(err);
//        if (!student) return callback(new Error('Failed to load student ' + id));
//
//        callback(null, student);
//    });
//};

exports.student = function(req, res, next) {
    Student.findById(req.params.studentId, function(err, student) {
        if (err) return next(err);
        if (!student) return next(new Error('Failed to load student ' + req.params.studentId));
        req.schoolClass = student;
        next();
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
          function (callback) {
              Complex.findById(student.complex, callback);
          },
          function (complex, callback) {
              user.school = complex.school;
              user.complex = complex._id;
              user.save(callback);
          },
          function (user, rowAffected, callback) {
              student.user = user._id;
              student.save(callback);
          }
      ],
      function (err, result) {
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
    var student = req.student;

    student = _.extend(student, req.body);

    student.save(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(student);
        }
    });
};

/**
 * Delete an student
 */
exports.destroy = function (req, res) {
    var student = req.student;

    student.remove(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(student);
        }
    });
};

/**
 * Show an student
 */
exports.show = function (req, res) {
    res.jsonp(req.student);
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

exports.allParents = function (req, res) {
    async.waterfall([
          function (callback) {
              Student.findById(req.params.studentId, callback);
          },
          function (student, callback) {
              User.find({'_id': { $in: student.parents} }, callback);
          }
      ],
      function (err, result) {
          if (err) {
              res.jsonp(400, err);
          } else {
              res.jsonp(result);
          }
      });
};

exports.createParent = function (req, res) {
    var user = new User(req.body);
    user.role = 'parent';

    var password = generatePassword(18, false);
    user.password = password;
    console.log('password generata: ' + password);

    async.waterfall([
          function (callback) {
              user.save(callback);
          },
          function (user, rowAffected, callback) {
              getStudent(req.params.studentId, function (err, student) {
                  student.parents.push(user._id)
                  student.save(callback);
              });
          }
      ],
      function (err, result) {
          if (err) {
              res.jsonp(400, err);
          } else {
              res.jsonp(result);
          }
      });
}
