'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Complex = mongoose.model('Complex'),
    ObjectId = mongoose.Types.ObjectId,
    _ = require('lodash');


/**
 * Find complex by id
 */
exports.complex = function(req, res, next) {
    Complex.findOne({
        _id: new ObjectId(req.params.complexId),
        school: new ObjectId(req.params.schoolId)
    }, function(err, complex) {
        if (err) return next(err);
        if (!complex) return next(new Error('Failed to load complex ' + req.params.complexId));

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
exports.destroy = function(req, res) {
    var complex = req.complex;

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
    res.jsonp(req.complex);
};

/**
 * List of complexes
 */
exports.all = function(req, res) {
    var where = { school: new ObjectId(req.params.schoolId) };

    if (_.contains(['teacher', 'student', 'parent'], req.user.role))
        where._id = req.user.complex;

    Complex.find(where, function(err, complexes) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(complexes);
        }
    });
};
