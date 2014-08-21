'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Complex = mongoose.model('Complex'),
    _ = require('lodash');


/**
 * Find complex by id
 */
exports.complex = function(req, res, next, id) {
    Complex.findById(id, function(err, complex) {
        if (err) return next(err);
        if (!complex) return next(new Error('Failed to load complex ' + id));
        if (complex.school.toString() !== req.params.schoolId) return next(new Error('The complex ' + id + ' is not related to school ' + req.params.schoolId));

        req.complex = complex;
        next();
    });
};

/**
 * Create an complex 
 */
exports.create = function(req, res) {
    var complex = new Complex(req.body);

    complex.save(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(complex);
        }
    });
};

/**
 * Update an complex 
 */
exports.update = function(req, res) {
    var complex = req.complex;

    complex = _.extend(complex, req.body);

    complex.save(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(complex);
        }
    });
};

/**
 * Delete an complex 
 */
//exports.destroy = function(req, res) {
//    var complex = req.complex;
//
//    complex.remove(function(err) {
//        if (err) {
//            res.jsonp(400, err);
//        } else {
//            res.jsonp(complex);
//        }
//    });
//};

/**
 * Show an complex 
 */
exports.show = function(req, res) {
    Complex.findById(req.params.complexId, function(err, complex) {
        if (err) return next(err);
        if (!complex) return next(new Error('Failed to load complex ' + req.params.complexId));
        if (complex.school.toString() !== req.params.schoolId) return next(new Error('The complex ' + id + ' is not related to school ' + req.params.schoolId));

        res.jsonp(complex);
    });
};

/**
 * List of complexes
 */
exports.all = function(req, res) {
    Complex.find({school: req.params.schoolId}, function(err, complexes) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(complexes);
        }
    });
};
