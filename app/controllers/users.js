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
exports.authCallback = function (req, res) {
    res.redirect('/');
};

/**
 * Check if the user is logged
 */
exports.loggedin = function (req, res) {
    if (req.user) {
        res.jsonp(req.user);
    } else {
        res.end('0');
    }
};

/**
 * Create user
 */
exports.create = function (req, res) {
    var user = new User(req.body);
    var password = generatePassword(18, false);
    user.password = password;
    console.log('password generata: ' + password);

    user.save(function (err) {
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
exports.update = function (req, res, next) {
    var user = req.userRes;

    if (user.role !== req.body.role)
        return next(new Error('Non e\' possibile cambiare il ruolo dell\'utente'));

    if (!req.body.password) {
        delete req.body.password;
    }

    user = _.extend(user, req.body);

    user.save(function (err) {
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
exports.show = function (req, res) {
    res.jsonp(req.userRes);
};

/**
 * Find user by id
 */
exports.user = function (req, res, next, id) {
    User.findOne({
        _id: id
    })
      .exec(function (err, user) {
          if (err) return next(err);
          if (!user) return next(new Error('Failed to load User ' + id));
          req.userRes = user;
          next();
      });
};

/**
 * List of Users
 */
exports.all = function (req, res) {
    User.find({}, function (err, users) {
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
exports.destroy = function (req, res) {
    var user = req.userRes;

    user.remove(function (err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(user);
        }
    });
};
