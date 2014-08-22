'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Parent = mongoose.model('Parent'),
    User = mongoose.model('User'),
    ObjectId = mongoose.Types.ObjectId,
    async = require('async'),
    generatePassword = require('password-generator'),
    _ = require('lodash');


/**
 * Find parent by id
 */
exports.parent = function (req, res, next) {
    Parent.findOne({
        _id: new ObjectId(req.params.parentId),
        student: new ObjectId(req.params.studentId),
        complex: new ObjectId(req.params.complexId),
        school: new ObjectId(req.params.schoolId)
    }, function (err, parent) {
        if (err) return next(err);
        if (!parent) return next(new Error('Failed to load parent ' + req.params.parentId));
        req.parent = parent;
        next();
    });
};

/**
 * Create an parent
 */
exports.create = function (req, res) {
    var parent = new Parent(req.body);

    var user = new User();
    user.name = parent.firstName + ' ' + parent.lastName;
    user.email = req.body.email;
    user.role = 'parent';
    user.complex = req.body.complex;
    user.school = req.body.school;

    var password = generatePassword(18, false);
    user.password = password;
    console.log('password generata: ' + password);

    async.waterfall([
            function (callback) {
                user.save(callback);
            },
            function (user, rowAffected, callback) {
                parent.user = user._id;
                parent.save(callback);
            }
        ],
        function (err, result) {
            if (err) {
                res.jsonp(400, err);
            } else {
                res.jsonp(result);
            }
        });
};

/**
 * Update an parent
 */
exports.update = function (req, res) {
    var parent = req.parent;

    parent = _.extend(parent, req.body);

    parent.save(function (err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(parent);
        }
    });
};

/**
 * Delete a parent
 */
exports.destroy = function (req, res) {
    var parent = req.parent;

    parent.remove(function (err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(parent);
        }
    });
};

/**
 * Show an parent
 */
exports.show = function (req, res) {
    res.jsonp(req.parent);
};

/**
 * List of parents
 */
exports.all = function (req, res) {
    parent.find({
        student: new ObjectId(req.params.studentId),
        complex: new ObjectId(req.params.complexId),
        school: new ObjectId(req.params.schoolId)
    }, function (err, parents) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(parents);
        }
    });
};
