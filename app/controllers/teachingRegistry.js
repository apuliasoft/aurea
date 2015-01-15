'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    TeachingRegistry = mongoose.model('TeachingRegistry'),
    Teaching = mongoose.model('Teaching'),
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

    AcademicYear.findById(academicYearId, function (err, academicYear){
        if (err) return next(err);

        // Controllo che la data sia compresa nell'anno scolastico
        var startDate = new Date(academicYear.startDate);
        var endDate = new Date(academicYear.endDate);
        if (date < new Date(startDate) || date > new Date(endDate)) {
            req.teachingRegistry = null;
            return next();
        }

        var weekDay = date.getDay() === 0 ? 7 : date.getDay();
        var day = _.find(academicYear.timeTable, function (day) {
            return day.weekDay === weekDay;
        });

        if (!day || day.slots.length === 0) {
            // La data non fa parte dell'anno scolastico
            req.teachingRegistry = null;
            return next();
        }

        Teaching.findById(teachingId, function(err, teaching){
            if (err) return next(err);

            var teacherId = teaching.teacher;

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
                          teacher: teacherId,
                          votes: [],
                          absences: []
                      });
                  }
                  req.teachingRegistry = teachingRegistry;
                  next();
              });
        });
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
        return res.jsonp(404, 'non trovato');
    }
    res.jsonp(teachingRegistry);
};