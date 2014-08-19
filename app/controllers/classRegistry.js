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
function classRegistry(classId, date, callback) {
    ClassRegistry.findOne({ schoolClass: classId, date: new Date(date) }, callback);
}

/**
 * Create or Update a class registry by year
 */
exports.createOrUpdate = function (req, res) {
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
exports.show = function (req, res) {
    classRegistry(req.params.classId, req.params.date, function (err, classRegistry) {
        res.jsonp(classRegistry || {});
    });
};