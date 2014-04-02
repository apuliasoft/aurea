'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Teacher Schema
 */
var TeacherSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
    // school: Schema.ObjectId
});

/**
 * Validations
 */

/**
 * Statics
 */

mongoose.model('Teacher', TeacherSchema);
