'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Communication = mongoose.model('Communication'),
    ObjectId = mongoose.Types.ObjectId,
    _ = require('lodash');

/**
 * Find communication by id
 */
exports.communication = function (req, res, next) {
    Communication.findOne({
        _id: new ObjectId(req.params.communicationId),
        school: new ObjectId(req.params.schoolId)
    }, function(err, communication){
        if (err) return next(err);
        if (!communication) return next(new Error('Failed to load communication ' + req.params.communicationId));
        req.communication = communication;
        next();
    });
};

/**
 * Create a communication
 */
exports.create = function(req, res) {
    var communication = new Communication(req.body);

    communication.save(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(communication);
        }
    });
};

/**
 * Update a communication
 */
exports.update = function(req, res) {
    var communication = req.communication;

    communication = _.extend(communication, req.body);

    communication.save(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(communication);
        }
    });
};

/**
 * Delete a communication
 */
exports.destroy = function(req, res) {
    var communication = req.communication;

    communication.remove(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(communication);
        }
    });
};

/**
 * Show a communication
 */
exports.show = function(req, res) {
    res.jsonp(req.communication);
};

/**
 * List of communications
 */
exports.all = function(req, res) {
    var where = { school: new ObjectId(req.params.schoolId) };

    Communication.find(where, function(err, communications) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(communications);
        }
    });
};
