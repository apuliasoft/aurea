'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    School = mongoose.model('School'),
    Complex = mongoose.model('Complex'),
    _ = require('lodash'),
    async = require('async');


/**
 * Find school by id
 */
exports.school = function(req, res, next, id) {
    School.loadWithComplexes(id, function(err, school){
        if (err) return next(err);
        if (!school) return next(new Error('Failed to load school ' + id));
        req.school = school;
        next();
    });
};

/**
 * Create a school
 */
exports.create = function(req, res) {
    var complexes = req.body.complexes;
    var school = new School({name: req.body.name, complexes: []});

    //TODO da pulire come l'update
    async.each(complexes, function(complex, callback){
        var schoolComplex = new Complex(complex);
        schoolComplex.save(function(err){
            if (err) {
                callback(err);
            } else {
                school.complexes.push(schoolComplex._id);
                callback();
            }
        });
    }, function(err){
        if(err) {
            res.jsonp(400, err);
        } else {
            // Salvo la scuola
            school.save(function(err) {
                if (err) {
                    res.jsonp(400, err);
                } else {
                    res.jsonp(school);
                }
            });
        }
    });
};

/**
 * Update a school
 */
exports.update = function(req, res, next) {
    var complexes = req.body.complexes;

    async.each(complexes, function(complex, callback){
        Complex.update({_id: complex._id}, complex, {upsert: true}, callback);
    }, function(err){
        if(err) next(err);

        //TODO con il save, si può fare l'upsert??

        //FIXME attenzione!! eliminare i complenni non più referenziati!!

        // FIXME se è stato aggiunto un plesso non ho l'_id
        // Sostituisco i complessi con i loro ID
        req.body.complexes = _.pluck(req.body.complexes, '_id');
        // Salvo la scuola
        School.update({_id: req.body._id}, req.body, function(err){
            if (err) return next(err);

            res.jsonp(req.body);
        });
    });
};

/**
 * Delete a school
 */
exports.destroy = function(req, res) {
    var school = req.school;

    school.remove(function(err) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(school);
        }
    });
};

/**
 * Show a school
 */
exports.show = function(req, res) {
    res.jsonp(req.school);
};

/**
 * List of schools
 */
exports.all = function(req, res) {
    School.find().populate('complexes').exec(function(err, schools) {
        if (err) {
            res.jsonp(400, err);
        } else {
            res.jsonp(schools);
        }
    });
};
