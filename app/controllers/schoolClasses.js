'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    SchoolClass = mongoose.model('SchoolClass'),
    _ = require('lodash');


/**
 * Find school class by id
 */
exports.schoolClass = function(req, res, next) {
    SchoolClass.findById(req.params.schoolClassId, function(err, schoolClass) {
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
    SchoolClass.find({}, function(err, schoolClass) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(schoolClass);
        }
    });
};
