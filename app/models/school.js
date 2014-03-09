'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Complex = require('./complex');


/**
 * School Schema
 */
var SchoolSchema = new Schema({
    name: String,
    complexes: [Complex]
});

/**
 * Validations
 */
SchoolSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

/**
 * Statics
 */


mongoose.model('School', SchoolSchema);
