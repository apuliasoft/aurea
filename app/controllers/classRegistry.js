'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  ClassRegistry = mongoose.model('ClassRegistry'),
  AcademicYear = mongoose.model('AcademicYear'),
  _ = require('lodash');

/**
 * Find a class registry by date
 */

exports.classRegistry = function (req, res, next) {
    var schoolClassId = req.params.schoolClassId;
    var date = new Date(req.params.date);
    var schoolId = req.params.schoolId;
    var complexId = req.params.complexId;
    var academicYearId = req.params.academicYearId;

    AcademicYear.findById(academicYearId, function (err, academicYear) {
        if (err) return next(err);

        // Controllo che la data sia compresa nell'anno scolastico
        var startDate = new Date(academicYear.startDate);
        var endDate = new Date(academicYear.endDate);
        if (date < new Date(startDate) || date > new Date(endDate)) {
            req.classRegistry = null;
            return next();
        }

        var weekDay = date.getDay() === 0 ? 7 : date.getDay();
        var day = _.find(academicYear.timeTable, function (day) {
            return day.weekDay === weekDay;
        });

        var slots = [];
        if (day && day.slots.length > 0) {
            slots = _.map(day.slots, function (slot, index) {
                return {number: index + 1};
            });
        } else {
            // La data non fa parte dell'anno scolastico
            req.classRegistry = null;
            return next();
        }

        ClassRegistry.findOne({
              schoolClass: schoolClassId,
              date: date,
              school: schoolId,
              complex: complexId,
              academicYear: academicYearId
          },
          function (err, classRegistry) {
              if (err) return next(err);
              if (!classRegistry) {
                  classRegistry = new ClassRegistry({
                      schoolClass: schoolClassId,
                      date: date,
                      school: schoolId,
                      complex: complexId,
                      academicYear: academicYearId,

                      slots: slots,
                      absences: [],
                      earlyLeaves: [],
                      lateEntrances: []
                  });

                  req.classRegistry = classRegistry;
                  next();
              } else {
                  req.classRegistry = classRegistry;
                  next();
              }
          });
    });


};

/**
 * Create or Update a class registry by year
 */
exports.createOrUpdate = function (req, res) {
    var classRegistry = req.classRegistry;

    if (!classRegistry) {
        classRegistry = new ClassRegistry(req.body);
    } else {
        classRegistry = _.extend(classRegistry, req.body);
    }

    classRegistry.save(function (err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(classRegistry);
        }
    });

};

/**
 * Show a class registry
 */
exports.show = function (req, res) {
    var classRegistry = req.classRegistry;

    if (!classRegistry) {
        return res.jsonp(404, 'non trovato');
    }
    res.jsonp(req.classRegistry);
};