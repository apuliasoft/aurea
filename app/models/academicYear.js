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
    name: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
    // complex: Schema.ObjectId
});

/**
 * Validations
 */

/**
 * Statics
 */

mongoose.model('AcademicYear', AcademicYearSchema);



