/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    SchoolClass = mongoose.model('SchoolClass');

exports.create = function(req, res) {
    var schoolClass = new SchoolClass(req.body);

    schoolClass.save(function(err) {
        if (err) {
            res.json(400, err);
        } else {
            res.json(schoolClass);
        }
    });
};

exports.update = function(req, res) {
    var schoolClass = req.schoolClass;
    schoolClass.set(req.body);

    schoolClass.save(function(err) {
        if (err) {
            res.json(400, err);
        } else {
            res.json(schoolClass);
        }
    });
};

exports.show = function(req, res) {
    res.json(req.schoolClass);
};

exports.all = function(req, res) {
    SchoolClass.find({}, function(err, schoolClass) {
        if (err) {
            res.json(400, err);
        } else {
            res.json(schoolClass);
        }
    });
};

exports.delete = function(req, res) {
    SchoolClass.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.json(400, err);
        } else {
            res.end();
        }
    });
};

/**
 * Find school class by id
 */
exports.schoolClass = function(req, res, next, id) {
    SchoolClass.findById(id, function(err, schoolClass) {
        if (err) return next(err);
        if (!schoolClass) return next(new Error('Failed to load school class ' + id));
        req.schoolClass = schoolClass;
        next();
    });
};