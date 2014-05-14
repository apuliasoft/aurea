'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * SchoolClass Schema
 */
var SchoolClassSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }],
    academicYear: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicYear'
    }
});

/**
 * Validations
 */

/**
 * Statics
 */

mongoose.model('SchoolClass', SchoolClassSchema);
