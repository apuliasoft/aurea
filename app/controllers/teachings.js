'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Teaching = mongoose.model('Teaching'),
    ObjectId = mongoose.Types.ObjectId,
    _ = require('lodash');


/**
 * Find teaching by id
 */
exports.teaching = function(req, res, next) {
    Teaching.findOne({
        _id: new ObjectId(req.params.teachingId),
        schoolClass: new ObjectId(req.params.schoolClassId),
        academicYear: new ObjectId(req.params.academicYearId),
        complex: new ObjectId(req.params.complexId),
        school: new ObjectId(req.params.schoolId)
    }, function(err, teaching) {
        if (err) return next(err);
        if (!teaching) return next(new Error('Failed to load teaching ' + req.params.schoolClassId));
        req.teaching = teaching;
        next();
    });
};

/**
 * Find teaching by id by teacher
 */
exports.teachingByTeacher = function(req, res, next) {
    Teaching.findOne({
        _id: new ObjectId(req.params.schoolClassId),
        teacher: new ObjectId(req.params.teacherId),
        academicYear: new ObjectId(req.params.academicYearId),
        complex: new ObjectId(req.params.complexId),
        school: new ObjectId(req.params.schoolId)
    }, function(err, teaching) {
        if (err) return next(err);
        if (!teaching) return next(new Error('Failed to load teaching ' + req.params.schoolClassId));
        req.teaching = teaching;
        next();
    });
};

/**
 * Create an teaching 
 */
exports.create = function(req, res) {
    var teaching = new Teaching(req.body);

    teaching.save(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(teaching);
        }
    });
};

/**
 * Update an teaching 
 */
exports.update = function(req, res) {
    var teaching = req.teaching;

    teaching = _.extend(teaching, req.body);

    teaching.save(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(teaching);
        }
    });
};

/**
 * Delete a teaching
 */
exports.destroy = function(req, res) {
    var teaching = req.teaching;

    teaching.remove(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(teaching);
        }
    });
};

/**
 * Show a teaching
 */
exports.show = function(req, res) {
    res.jsonp(req.teaching);
};

/**
 * Show a teaching by teacher
 */
exports.showByTeacher = function(req, res) {
    res.jsonp(req.teaching);
};

/**
 * List of teachings
 */
exports.all = function(req, res) {
    Teaching.find({
        schoolClass: new ObjectId(req.params.schoolClassId),
        academicYear: new ObjectId(req.params.academicYearId),
        complex: new ObjectId(req.params.complexId),
        school: new ObjectId(req.params.schoolId)
    }, function(err, teachings) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(teachings);
        }
    });
};

/**
 * List of teachings by teacher
 */
exports.allByTeacher = function(req, res) {
    Teaching.find({
        teacher: new ObjectId(req.params.teacherId),
        academicYear: new ObjectId(req.params.academicYearId),
        complex: new ObjectId(req.params.complexId),
        school: new ObjectId(req.params.schoolId)
    }, function(err, teachings) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(teachings);
        }
    });
};
