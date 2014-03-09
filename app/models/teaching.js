'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Teaching Schema
 */
var TeachingSchema = new Schema({
    name: String
    //class: Schema.ObjectId
    //teacher: Schema.ObjectId
});

/**
 * Validations
 */
TeachingSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

/**
 * Statics
 */


mongoose.model('Teaching', TeachingSchema);
