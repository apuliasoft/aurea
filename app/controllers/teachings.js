'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Teaching = mongoose.model('Teaching'),
    _ = require('lodash');


/**
 * Find teaching by id
 */
exports.teaching = function(req, res, next, id) {
    Teaching.findById(id, function(err, teaching) {
        if (err) return next(err);
        if (!teaching) return next(new Error('Failed to load teaching ' + id));
        req.teaching = teaching;
        next();
    });
};

/**
 * Create an teaching 
 */
exports.create = function(req, res) {
    var teaching = new Teaching(req.body);

    teaching.save(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(teaching);
        }
    });
};

/**
 * Update an teaching 
 */
exports.update = function(req, res) {
    var teaching = req.teaching;

    teaching = _.extend(teaching, req.body);

    teaching.save(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(teaching);
        }
    });
};

/**
 * Delete an teaching 
 */
exports.destroy = function(req, res) {
    var teaching = req.teaching;

    teaching.remove(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(teaching);
        }
    });
};

/**
 * Show an teaching 
 */
exports.show = function(req, res) {
    res.jsonp(req.teaching);
};

/**
 * List of teachings
 */
exports.all = function(req, res) {
    Teaching.find({}, function(err, teaching) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(teaching);
        }
    });
};
