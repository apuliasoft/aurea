'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    ClassRegistry = mongoose.model('ClassRegistry'),
    _ = require('lodash');

/**
 * Find a class registry by date
 */
exports.classRegistry = function(req, res, next, day) {
    ClassRegistry.findOne({ day: new Date(day) }, function(err, classRegistry) {
        if (err) return next(err);

        if (classRegistry) {
            req.classRegistry = classRegistry;
        }

        next();
    });
};

/**
 * Create or Update a class registry by year
 */
exports.createOrUpdate = function(req, res) {
    var classRegistry = req.classRegistry;

    if (!classRegistry) {
        classRegistry = new ClassRegistry(req.body);
    } else {
        classRegistry = _.extend(classRegistry, req.body);
    }

    classRegistry.save(function (err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(classRegistry);
        }
    });

};

/**
 * Show a class registry
 */
exports.show = function(req, res) {
    res.jsonp(req.classRegistry || {});
};