/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    AcademicYear = mongoose.model('AcademicYear');

exports.create = function(req, res) {
    var academicYear = new AcademicYear(req.body);

    academicYear.save(function(err) {
        if (err) {
            res.json(400, err);
        } else {
            res.json(academicYear);
        }
    });
};

exports.update = function(req, res) {
    var academicYear = req.academicYear;
    academicYear.set(req.body);

    academicYear.save(function(err) {
        if (err) {
            res.json(400, err);
        } else {
            res.json(academicYear);
        }
    });
};

exports.show = function(req, res) {
    res.json(req.academicYear);
};

exports.all = function(req, res) {
    AcademicYear.find({}, function(err, academicYear) {
        if (err) {
            res.json(400, err);
        } else {
            res.json(academicYear);
        }
    });
};

exports.delete = function(req, res) {
    AcademicYear.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.json(400, err);
        } else {
            res.end();
        }
    });
};

/**
 * Find academic year by id
 */
exports.academicYear = function(req, res, next, id) {
    AcademicYear.findById(id, function(err, academicYear) {
        if (err) return next(err);
        if (!academicYear) return next(new Error('Failed to load academic year ' + id));
        req.academicYear = academicYear;
        next();
    });
};