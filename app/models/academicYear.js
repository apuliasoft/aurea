'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * AcademicYear Schema
 */
var AcademicYearSchema = new Schema({
    name: String,
    startDate: Date,
    endDate: Date
    // school: Schema.ObjectId
});

/**
 * Validations
 */
AcademicYearSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

AcademicYearSchema.path('startDate').validate(function(startDate) {
    return startDate.length;
}, 'Start date cannot be blank');

AcademicYearSchema.path('endDate').validate(function(endDate) {
    return endDate.length;
}, 'End date cannot be blank');

/**
 * Statics
 */


mongoose.model('AcademicYear', AcademicYearSchema);
