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
    }
});

/**
 * Validations
 */


mongoose.model('School', SchoolSchema);