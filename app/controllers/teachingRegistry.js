'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    TeachingRegistry = mongoose.model('TeachingRegistry'),
    _ = require('lodash');

/**
 * Find a teaching registry by date
 */
exports.teachingRegistry = function(req, res, next, day) {
    TeachingRegistry.findOne({ day: new Date(day) }, function(err, teachingRegistry) {
        if (err) return next(err);

        if (teachingRegistry) {
            req.teachingRegistry = teachingRegistry;
        }

        next();
    });
};

/**
 * Create or Update a teaching registry by year
 */
exports.createOrUpdate = function(req, res) {
    var teachingRegistry = req.teachingRegistry;

    if (!teachingRegistry) {
        teachingRegistry = new TeachingRegistry(req.body);
    } else {
        teachingRegistry = _.extend(teachingRegistry, req.body);
    }

    teachingRegistry.save(function (err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(teachingRegistry);
        }
    });

};

/**
 * Show a class registry
 */
exports.show = function(req, res) {
    res.jsonp(req.teachingRegistry || {});
};