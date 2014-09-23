'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Complex Schema
 */
var CommunicationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    active: {
        type: Boolean
    },
    pubDate: {
        type: Date
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true
    }
});

/**
 * Validations
 */

/**
 * Statics
 */


mongoose.model('Communication', CommunicationSchema);