/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Teacher = mongoose.model('Teacher');

exports.create = function(req, res) {
    var teacher = new Teacher(req.body);

    teacher.save(function(err) {
        if (err) {
            res.json(400, err);
        } else {
            res.json(teacher);
        }
    });
}

exports.update = function(req, res) {
    var teacher = req.teacher;
    teacher.set(req.body);

    teacher.save(function(err) {
        if (err) {
            res.json(400, err);
        } else {
            res.json(teacher);
        }
    });
};

exports.show = function(req, res) {
    res.json(req.teacher);
}

exports.all = function(req, res) {
    Teacher.find({}, function(err, teacher) {
        if (err) {
            res.json(400, err);
        } else {
            res.json(teacher);
        }
    });
}

exports.delete = function(req, res) {
    Teacher.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.json(400, err);
        } else {
            res.end();
        }
    });
};

/**
 * Find teacher by id
 */
exports.teacher = function(req, res, next, id) {
    Teacher.findById(id, function(err, teacher) {
        if (err) return next(err);
        if (!teacher) return next(new Error('Failed to load teacher ' + id));
        req.teacher = teacher;
        next();
    });
};