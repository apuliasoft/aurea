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
        req.Complex = complex;
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
    var complex = req.Complex;

    complex = _.extend(Complex, req.body);

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
exports.destroy = function(req, res) {
    var complex = req.Complex;

    complex.remove(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(complex);
        }
    });
};

/**
 * Show an complex 
 */
exports.show = function(req, res) {
    res.jsonp(req.Complex);
};

/**
 * List of complexes
 */
exports.all = function(req, res) {
    Complex.find({}, function(err, complexes) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(complexes);
        }
    });
};
