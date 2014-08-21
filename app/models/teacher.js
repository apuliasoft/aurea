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
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    complex: {
        type: Schema.Types.ObjectId,
        ref: 'Complex'
    }
});

/**
 * Validations
 */

/**
 * Statics
 */

mongoose.model('Teacher', TeacherSchema);
