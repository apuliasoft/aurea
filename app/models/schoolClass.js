'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * SchoolClass Schema
 */
var SchoolClassSchema = new Schema({
    name: {
        type: String,
        required: true
    }
    //students: [Schema.ObjectId]
    //academicYear: Schema.ObjectId
});

/**
 * Validations
 */

/**
 * Statics
 */

mongoose.model('SchoolClass', SchoolClassSchema);
