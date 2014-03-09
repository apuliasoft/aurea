'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Teacher = mongoose.model('Teacher'),
    _ = require('lodash');


/**
 * Find teacher by id
 */
exports.teacher = function(req, res, next, id) {
    Teacher.findById(id, function(err, teacher) {
        if (err) return next(err);
        if (!teacher) return next(new Error('Failed to load teacher ' + id));
        req.teacher = teacher;
        next();
    });
};

/**
 * Create an teacher 
 */
exports.create = function(req, res) {
    var teacher = new Teacher(req.body);

    teacher.save(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(teacher);
        }
    });
};

/**
 * Update an teacher 
 */
exports.update = function(req, res) {
    var teacher = req.teacher;

    teacher = _.extend(teacher, req.body);

    teacher.save(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(teacher);
        }
    });
};

/**
 * Delete an teacher 
 */
exports.destroy = function(req, res) {
    var teacher = req.teacher;

    teacher.remove(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(teacher);
        }
    });
};

/**
 * Show an teacher 
 */
exports.show = function(req, res) {
    res.jsonp(req.teacher);
};

/**
 * List of teachers
 */
exports.all = function(req, res) {
    Teacher.find({}, function(err, teacher) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(teacher);
        }
    });
};
