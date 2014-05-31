'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Complex Schema
 */
var ComplexSchema = new Schema({
    street: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    province: {
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


mongoose.model('Complex', ComplexSchema);