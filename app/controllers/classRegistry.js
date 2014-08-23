'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  ClassRegistry = mongoose.model('ClassRegistry'),
  _ = require('lodash');

/**
 * Find a class registry by date
 */

exports.classRegistry = function (req, res, next) {
    ClassRegistry.findOne({
          schoolClass: req.params.schoolClassId,
          date: new Date(req.params.date),
          school: req.params.schoolId,
          complex: req.params.complexId,
          academicYear: req.params.academicYearId
      },
      function (err, classRegistry) {
          if (err) return next(err);

          req.classRegistry = classRegistry;
          next();
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