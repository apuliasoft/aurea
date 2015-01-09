'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    SchoolClass = mongoose.model('SchoolClass'),
    Student = mongoose.model('Student'),
    ClassRegistry = mongoose.model('ClassRegistry'),
    ObjectId = mongoose.Types.ObjectId,
    async = require('async'),
    _ = require('lodash');


/**
 * Find school class by id
 */
exports.schoolClass = function(req, res, next) {
    SchoolClass.findOne({
        _id: new ObjectId(req.params.schoolClassId),
        academicYear: new ObjectId(req.params.academicYearId),
        complex: new ObjectId(req.params.complexId),
        school: new ObjectId(req.params.schoolId)
    }, function(err, schoolClass) {
        if (err) return next(err);
        if (!schoolClass) return next(new Error('Failed to load school class ' + req.params.schoolClassId));
        req.schoolClass = schoolClass;
        next();
    });
};

/**
 * Create an school class 
 */
exports.create = function(req, res) {
    var schoolClass = new SchoolClass(req.body);

    schoolClass.save(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(schoolClass);
        }
    });
};

/**
 * Update an school class 
 */
exports.update = function(req, res) {
    var schoolClass = req.schoolClass;

    schoolClass = _.extend(schoolClass, req.body);

    schoolClass.save(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(schoolClass);
        }
    });
};

/**
 * Delete an school class 
 */
exports.destroy = function(req, res) {
    var schoolClass = req.schoolClass;

    schoolClass.remove(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(schoolClass);
        }
    });
};

/**
 * Show an school class 
 */
exports.show = function(req, res) {
    res.jsonp(req.schoolClass);
};

/**
 * List of school classes
 */
exports.all = function(req, res) {
    SchoolClass.find({
        academicYear: new ObjectId(req.params.academicYearId),
        complex: new ObjectId(req.params.complexId),
        school: new ObjectId(req.params.schoolId)
    }, function(err, schoolClass) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(schoolClass);
        }
    });
};

exports.allStudents = function (req, res) {
    async.waterfall([
          function (callback) {
              SchoolClass.findById(req.params.schoolClassId, callback);
          },
          function (schoolClass, callback) {
              Student.find({'_id': { $in: schoolClass.students} }).populate('user', 'email').exec(callback);
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

exports.studentStats = function (req, res){
    var student = new ObjectId(req.params.studentId);
    ClassRegistry.aggregate()
      .match({
          school: new ObjectId(req.params.schoolId),
          complex: new ObjectId(req.params.complexId),
          academicYear: new ObjectId(req.params.academicYearId),
          schoolClass: new ObjectId(req.params.schoolClassId),
          absences: student
      })
      .group({
          _id: null,
          absences: {$addToSet: '$date'}
      })
      .exec(function (err, result){
          if(err) {
              res.jsonp(400, err);
          } else {
              res.jsonp(result[0]);
          }
      });
};
