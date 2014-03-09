'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Teacher Schema
 */
var TeacherSchema = new Schema({
    firstName: String,
    lastName: String
    // school: Schema.ObjectId
});

/**
 * Validations
 */
TeacherSchema.path('firstName').validate(function(firstName) {
    return firstName.length;
}, 'First name cannot be blank');

TeacherSchema.path('lastName').validate(function(lastName) {
    return lastName.length;
}, 'Last name cannot be blank');

/**
 * Statics
 */


mongoose.model('Teacher', TeacherSchema);
