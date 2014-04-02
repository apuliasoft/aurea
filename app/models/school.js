'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * School Schema
 */
var SchoolSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    complexes: [{
        _id: false,
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
    }]
});

/**
 * Validations
 */

/**
 * Statics
 */


mongoose.model('School', SchoolSchema);