/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Student = mongoose.model('Student');

exports.create = function(req, res) {
    var student = new Student(req.body);

    student.save(function(err) {
        if (err) {
            res.json(400, err);
        } else {
            res.json(student);
        }
    });
};

exports.update = function(req, res) {
    var student = req.student;
    student.set(req.body);

    student.save(function(err) {
        if (err) {
            res.json(400, err);
        } else {
            res.json(student);
        }
    });
};

exports.show = function(req, res) {
    res.json(req.student);
};

exports.all = function(req, res) {
    Student.find({}, function(err, student) {
        if (err) {
            res.json(400, err);
        } else {
            res.json(student);
        }
    });
};

exports.delete = function(req, res) {
    Student.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.json(400, err);
        } else {
            res.end();
        }
    });
};

/**
 * Find student by id
 */
exports.student = function(req, res, next, id) {
    Student.findById(id, function(err, student) {
        if (err) return next(err);
        if (!student) return next(new Error('Failed to load student ' + id));
        req.student = student;
        next();
    });
};