'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Student = mongoose.model('Student'),
    User = mongoose.model('User'),
    ObjectId = mongoose.Types.ObjectId,
    async = require('async'),
    generatePassword = require('password-generator'),
    _ = require('lodash');


/**
 * Find student by id
 */
exports.student = function (req, res, next) {
    Student.findOne({
        _id: new ObjectId(req.params.studentId),
        complex: new ObjectId(req.params.complexId),
        school: new ObjectId(req.params.schoolId)
    }).populate('user').exec(function (err, student) {
        if (err) return next(err);
        if (!student) return next(new Error('Failed to load student ' + req.params.studentId));
        req.student = student;
        next();
    });
};

/**
 * Create an student
 */
exports.create = function (req, res) {
    var user = new User(req.body.user);
    delete req.body.user;

    var student = new Student(req.body);

    user.name = student.firstName + ' ' + student.lastName;
    user.role = 'student';
    user.complex = student.complex;
    user.school = student.school;

    var password = generatePassword(18, false);
    user.password = password;
    console.log('password generata: ' + password);


    async.waterfall([
            function (callback) {
                user.save(callback);
            },
            function (user, rowAffected, callback) {
                student.user = user._id;
                student.save(callback);
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
 * Update an student
 */
exports.update = function (req, res) {
    var user = req.student.user;
    user = _.extend(user, req.body.user);

    delete req.student.user;
    delete req.body.user;

    var student = req.student;
    student = _.extend(student, req.body);

    user.name = student.firstName + ' ' + student.lastName;

    async.waterfall([
            function (callback) {
                user.save(callback);
            },
            function (user, rowAffected, callback) {
                student.save(callback);
            }
        ],
        function (err, result) {
            if (err) {
                res.jsonp(400, err);
            } else {
                student = result.toObject();
                student.user = _.pick(student.user, ['_id','email']);
                res.jsonp(student);
            }
        });
};

/**
 * Delete an student
 */
exports.destroy = function (req, res) {
    var student = req.student;

    student.remove(function (err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(student);
        }
    });
};

/**
 * Show an student
 */
exports.show = function (req, res) {
    var student = req.student.toObject();
    student.user = _.pick(student.user, ['_id','email']);
    res.jsonp(student);
};

/**
 * List of students
 */
exports.all = function (req, res) {
    Student.find({
        complex: new ObjectId(req.params.complexId),
        school: new ObjectId(req.params.schoolId)
    }).populate('user', 'email').exec(function (err, students) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(students);
        }
    });
};
