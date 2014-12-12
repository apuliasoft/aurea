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
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    email: {
        type: String,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    text: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }

});

/**
 * Validations
 */

/**
 * Statics
 */

mongoose.model('Feedback', FeedbackSchema);
