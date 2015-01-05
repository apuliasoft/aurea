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
    }).populate('user').exec(function (err, parent) {
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
    var user = new User(req.body.user);
    delete req.body.user;

    var parent = new Parent(req.body);

    user.name = parent.firstName + ' ' + parent.lastName;
    user.role = 'parent';
    user.complex = parent.complex;
    user.school = parent.school;

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
    var user = req.parent.user;
    user = _.extend(user, req.body.user);

    delete req.parent.user;
    delete req.body.user;

    var parent = req.parent;
    parent = _.extend(parent, req.body);

    user.name = parent.firstName + ' ' + parent.lastName;

    async.waterfall([
            function (callback) {
                user.save(callback);
            },
            function (user, rowAffected, callback) {
                parent.save(callback);
            }
        ],
        function (err, result) {
            if (err) {
                res.jsonp(400, err);
            } else {
                parent = result.toObject();
                parent.user = _.pick(parent.user, ['_id','email']);
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
    var parent = req.parent.toObject();
    parent.user = _.pick(parent.user, ['_id','email']);
    res.jsonp(parent);
};

/**
 * List of parents
 */
exports.all = function (req, res) {
    Parent.find({
        student: new ObjectId(req.params.studentId),
        complex: new ObjectId(req.params.complexId),
        school: new ObjectId(req.params.schoolId)
    }).populate('user', 'email').exec(function (err, parents) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(parents);
        }
    });
};
