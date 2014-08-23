'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Teacher = mongoose.model('Teacher'),
    User = mongoose.model('User'),
    ObjectId = mongoose.Types.ObjectId,
    async = require('async'),
    generatePassword = require('password-generator'),
    _ = require('lodash');

/**
 * Find teacher by id
 */
exports.teacher = function (req, res, next) {
    Teacher.findOne({
        _id: new ObjectId(req.params.teacherId),
        complex: new ObjectId(req.params.complexId),
        school: new ObjectId(req.params.schoolId)
    }).populate('user').exec(function (err, teacher) {
        if (err) return next(err);
        if (!teacher) return next(new Error('Failed to load teacher ' + req.params.teacherId));
        req.teacher = teacher;
        next();
    });
};

/**
 * Create an teacher
 */
exports.create = function (req, res) {
    var user = new User(req.body.user);
    delete req.body.user;

    var teacher = new Teacher(req.body);

    user.name = teacher.firstName + ' ' + teacher.lastName;
    user.role = 'teacher';
    user.complex = teacher.complex;
    user.school = teacher.school;

    var password = generatePassword(18, false);
    user.password = password;
    console.log('password generata: ' + password);


    async.waterfall([
            function (callback) {
                user.save(callback);
            },
            function (user, rowAffected, callback) {
                teacher.user = user._id;
                teacher.save(callback);
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
 * Update an teacher
 */
exports.update = function (req, res) {
    var user = req.teacher.user;
    user = _.extend(user, req.body.user);

    delete req.teacher.user;
    delete req.body.user;

    var teacher = req.teacher;
    teacher = _.extend(teacher, req.body);

    user.name = teacher.firstName + ' ' + teacher.lastName;

    async.waterfall([
            function (callback) {
                user.save(callback);
            },
            function (user, rowAffected, callback) {
                teacher.save(callback);
            }
        ],
        function (err, result) {
            if (err) {
                res.jsonp(400, err);
            } else {
                teacher = result.toObject();
                teacher.user = _.pick(teacher.user, ['_id','email']);
                res.jsonp(teacher);
            }
        });
};

/**
 * Delete an teacher
 */
exports.destroy = function (req, res) {
    var teacher = req.teacher;

    teacher.remove(function (err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(teacher);
        }
    });
};

/**
 * Show an teacher
 */
exports.show = function (req, res) {
    var teacher = req.teacher.toObject();
    teacher.user = _.pick(teacher.user, ['_id','email']);
    res.jsonp(teacher);
};

/**
 * List of teachers
 */
exports.all = function (req, res) {
    Teacher.find({
        complex: new ObjectId(req.params.complexId),
        school: new ObjectId(req.params.schoolId)
    }).populate('user', 'email').exec(function (err, teacher) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(teacher);
        }
    });
};
