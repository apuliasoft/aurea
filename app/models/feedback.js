'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Feedback Schema
 */
var FeedbackSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    }
});

/**
 * Validations
 */

/**
 * Statics
 */

mongoose.model('Feedback', FeedbackSchema);
