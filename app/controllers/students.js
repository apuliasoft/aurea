'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Student = mongoose.model('Student'),
    _ = require('lodash');


/**
 * Find student by id
 */
exports.student = function(req, res, next, id) {
    Student.findById(id, function(err, student) {
        if (err) return next(err);
        if (!student) return next(new Error('Failed to load student ' + id));
        req.student = student;
        next();
    });
};

/**
 * Create an student 
 */
exports.create = function(req, res) {
    var student = new Student(req.body);

    student.save(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(student);
        }
    });
};

/**
 * Update an student 
 */
exports.update = function(req, res) {
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
exports.destroy = function(req, res) {
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
exports.show = function(req, res) {
    res.jsonp(req.student);
};

/**
 * List of students
 */
exports.all = function(req, res) {
    Student.find({}, function(err, student) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(student);
        }
    });
};
