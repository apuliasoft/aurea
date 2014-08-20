'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    AcademicYear = mongoose.model('AcademicYear'),
    _ = require('lodash'),
    ObjectId = mongoose.Types.ObjectId;


/**
 * Find academic year by id
 */
exports.academicYear = function(req, res, next, id) {
    AcademicYear.findById(id, function(err, academicYear) {
        if (err) return next(err);
        if (!academicYear) return next(new Error('Failed to load academic year ' + id));
        req.academicYear = academicYear;
        next();
    });
};

/**
 * Create an academic year 
 */
exports.create = function(req, res) {
    var academicYear = new AcademicYear(req.body);

    academicYear.save(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(academicYear);
        }
    });
};

/**
 * Update an academic year 
 */
exports.update = function(req, res) {
    var academicYear = req.academicYear;

    academicYear = _.extend(academicYear, req.body);

    academicYear.save(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(academicYear);
        }
    });
};

/**
 * Delete an academic year 
 */
exports.destroy = function(req, res) {
    var academicYear = req.academicYear;

    academicYear.remove(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(academicYear);
        }
    });
};

/**
 * Show an academic year 
 */
exports.show = function(req, res) {
    res.jsonp(req.academicYear);
};

/**
 * List of academic years
 */
exports.all = function(req, res) {
    AcademicYear.find({}, function(err, academicYears) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(academicYears);
        }
    });
};

/**
 * List of academic years
 */
exports.getTimeTable = function(req, res) {
    res.jsonp(req.academicYear.timeTable);
};

/**
 * Get all academic Years by complex id
 */
exports.getByComplex = function(req, res) {
    AcademicYear.find({complex: new ObjectId(req.params.complexId)}, function(err, academicYears){
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(academicYears);
        }
    });
};