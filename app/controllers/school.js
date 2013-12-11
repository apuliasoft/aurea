/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    School = mongoose.model('School');

exports.create = function(req, res) {
    var school = new School(req.body);

    school.save(function(err) {
        if (err) {
            res.json(err.errors);
        } else {
            res.json(school);
        }
    });
};

exports.show = function(req, res) {
    res.json(req.school);
};

exports.all = function(req, res) {
    School.find({}, function(err, schools) {
        if (err) {
            res.json(err.errors);
        } else {
            res.json(schools);
        }
    });
};

/**
 * Find school by id
 */
exports.school = function(req, res, next, id) {
    School.findById(id, function(err, school) {
        if (err) return next(err);
        if (!school) return next(new Error('Failed to load school ' + id));
        req.school = school;
        next();
    });
};