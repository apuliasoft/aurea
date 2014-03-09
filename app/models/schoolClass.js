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
    name: String
    //students: [Schema.ObjectId]
    //academicYear: Schema.ObjectId
});

/**
 * Validations
 */
SchoolClassSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

/**
 * Statics
 */


mongoose.model('SchoolClass', SchoolClassSchema);
