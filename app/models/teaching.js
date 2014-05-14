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
    schoolClass: {
        type: Schema.Types.ObjectId,
        ref: 'SchoolClass'
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    }
});

/**
 * Validations
 */

/**
 * Statics
 */


mongoose.model('Teaching', TeachingSchema);
