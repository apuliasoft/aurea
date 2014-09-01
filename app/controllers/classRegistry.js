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

    ClassRegistry.findOne({
          schoolClass: req.params.schoolClassId,
          date: new Date(req.params.date),
          school: req.params.schoolId,
          complex: req.params.complexId,
          academicYear: req.params.academicYearId
      },
      function (err, classRegistry) {
          if (err) return next(err);
          if(!classRegistry){
              AcademicYear.findById(academicYearId, function(err, academicYear){
                  if(err) return next(err);
                  var weekDay = date.getDay() === 0 ? 7 : date.getDay();
                  var day = _.find(academicYear.timeTable, function (day) {
                      return day.weekDay === weekDay;
                  });

                  var slots = [];
                  if (day) {
                      slots = _.map(day.slots, function (slot, index) {
                          return {number: index + 1};
                      });
                  }

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
              });
          } else {
              req.classRegistry = classRegistry;
              next();
          }
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

    if(!classRegistry) {
        res.jsonp(404, 'non trovato');
    }
    res.jsonp(req.classRegistry);
};