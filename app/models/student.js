'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Student Schema
 */
var StudentSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
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

mongoose.model('Student', StudentSchema);
