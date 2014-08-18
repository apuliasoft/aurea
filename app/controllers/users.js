'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    generatePassword = require('password-generator'),
    _ = require('lodash');

/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
    res.redirect('/');
};

/**
 * Create user
 */
exports.create = function(req, res) {
    var user = new User(req.body);
    user.password = generatePassword(18, false);

    user.save(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(user);
        }
    });
};

/**
 * Update a User
 */
exports.update = function(req, res) {
    var user = req.user;

    user = _.extend(user, req.body);

    user.save(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(user);
        }
    });
};

/**
 * Send User
 */
exports.show = function(req, res) {
    res.jsonp(req.user);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    User.findOne({
        _id: id
    })
    .exec(function(err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load User ' + id));
        req.user = user;
        next();
    });
};

/**
 * List of Users
 */
exports.all = function(req, res) {
    User.find({}, function(err, users) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(users);
        }
    });
};

/**
 * Delete a user
 */
exports.destroy = function(req, res) {
    var user = req.user;

    user.remove(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(user);
        }
    });
};
