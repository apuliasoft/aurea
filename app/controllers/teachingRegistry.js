'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    TeachingRegistry = mongoose.model('TeachingRegistry'),
  AcademicYear = mongoose.model('AcademicYear'),
    _ = require('lodash');

/**
 * Find a teaching registry by date
 */
exports.teachingRegistry = function(req, res, next) {
    var schoolClassId = req.params.schoolClassId;
    var date = new Date(req.params.date);
    var schoolId = req.params.schoolId;
    var complexId = req.params.complexId;
    var academicYearId = req.params.academicYearId;
    var teachingId = req.params.teachingId;

    TeachingRegistry.findOne({
          schoolClass: schoolClassId,
          date: date,
          school: schoolId,
          complex: complexId,
          academicYear: academicYearId,
          teaching: teachingId
      },
      function (err, teachingRegistry) {
          if (err) return next(err);
          if(!teachingRegistry){
              teachingRegistry = new TeachingRegistry({
                  schoolClass: schoolClassId,
                  date: date,
                  school: schoolId,
                  complex: complexId,
                  academicYear: academicYearId,
                  teaching: teachingId,

                  votes: [],
                  absences: []
              });
          }
          req.teachingRegistry = teachingRegistry;
          next();
      });
};

/**
 * Create or Update a teaching registry by year
 */
exports.createOrUpdate = function(req, res) {
    var teachingRegistry = req.teachingRegistry;

    if (!teachingRegistry) {
        teachingRegistry = new TeachingRegistry(req.body);
    } else {
        teachingRegistry = _.extend(teachingRegistry, req.body);
    }

    teachingRegistry.save(function (err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(teachingRegistry);
        }
    });

};

/**
 * Show a class registry
 */
exports.show = function(req, res) {
    var teachingRegistry = req.teachingRegistry;

    if(!teachingRegistry) {
        res.jsonp(404, 'non trovato');
    }
    res.jsonp(teachingRegistry);
};