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
    }
    //class: Schema.ObjectId
    //teacher: Schema.ObjectId
});

/**
 * Validations
 */

/**
 * Statics
 */


mongoose.model('Teaching', TeachingSchema);
