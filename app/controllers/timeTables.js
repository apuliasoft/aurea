'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    TimeTable = mongoose.model('TimeTable'),
    _ = require('lodash');


/**
 * Find timeTable by id
 */
exports.timeTable = function(req, res, next, id) {
    TimeTable.findById(id, function(err, timeTable) {
        if (err) return next(err);
        if (!timeTable) return next(new Error('Failed to load timeTable ' + id));
        req.timeTable = timeTable;
        next();
    });
};

/**
 * Create an timeTable
 */
exports.create = function(req, res) {
    var timeTable = new TimeTable(req.body);

    timeTable.save(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(timeTable);
        }
    });
};

/**
 * Update an timeTable
 */
exports.update = function(req, res) {
    var timeTable = req.timeTable;

    timeTable = _.extend(timeTable, req.body);

    timeTable.save(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(timeTable);
        }
    });
};

/**
 * Delete an timeTable
 */
exports.destroy = function(req, res) {
    var timeTable = req.timeTable;

    timeTable.remove(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(timeTable);
        }
    });
};

/**
 * Show an timeTable
 */
exports.show = function(req, res) {
    res.jsonp(req.timeTable);
};

/**
 * List of timeTables
 */
exports.all = function(req, res) {
    TimeTable.find({}, function(err, timeTable) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(timeTable);
        }
    });
};
