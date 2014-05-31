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
        type: Schema.Types.ObjectId,
        ref: 'Complex'
    }]
});

/**
 * Validations
 */

/**
 * Statics
 */


mongoose.model('School', SchoolSchema);