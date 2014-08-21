'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Teaching Schema
 */
var TeachingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
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
    schoolClass: {
        type: Schema.Types.ObjectId,
        ref: 'SchoolClass',
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    }
});

/**
 * Validations
 */

/**
 * Statics
 */


mongoose.model('Teaching', TeachingSchema);
