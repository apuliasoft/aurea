'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    School = mongoose.model('School'),
    ObjectId = mongoose.Types.ObjectId,
    _ = require('lodash');


/**
 * Find school by id
 */
exports.school = function(req, res, next) {
    School.findOne({
        _id: new ObjectId(req.params.schoolId)
    }, function(err, school){
        if (err) return next(err);
        if (!school) return next(new Error('Failed to load school ' + req.params.schoolId));

        req.school = school;
        next();
    });
};

/**
 * Create a school
 */
exports.create = function(req, res) {
    var school = new School(req.body);

    school.save(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(school);
        }
    });
};

/**
 * Update a school
 */
exports.update = function(req, res) {
    var school = req.school;

    school = _.extend(school, req.body);

    school.save(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(school);
        }
    });
};

/**
 * Delete a school
 */
exports.destroy = function(req, res) {
    var school = req.school;

    school.remove(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(school);
        }
    });
};

/**
 * Show a school
 */
exports.show = function(req, res) {
    res.jsonp(req.school);
};

/**
 * List of schools
 */
exports.all = function(req, res) {
    var where = {};

    if (req.user.role !== 'admin')
        where._id = req.user.school;

    School.find(where, function(err, schools) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(schools);
        }
    });
};
