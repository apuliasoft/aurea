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
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    complex: {
        type: Schema.Types.ObjectId,
        ref: 'Complex',
        required: true
    },
    academicYear: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicYear',
        required: true
    }
});

/**
 * Validations
 */

/**
 * Statics
 */

mongoose.model('SchoolClass', SchoolClassSchema);
