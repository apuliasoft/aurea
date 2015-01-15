'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Feedback = mongoose.model('Feedback');

/**
 * Create an feedback
 */
exports.create = function (req, res) {

    var feedback = new Feedback(req.body);
    feedback.ip = req.ip;

    feedback.save(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(feedback);
        }
    });
};

/**
 * List of feedbacks
 */
exports.all = function (req, res) {
    Feedback.find({},function (err, feedbacks) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(feedbacks);
        }
    });
};
