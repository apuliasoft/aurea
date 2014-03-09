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
    firstName: String,
    lastName: String,
    birthDate: Date
    // school: Schema.ObjectId
});

/**
 * Validations
 */
StudentSchema.path('firstName').validate(function(firstName) {
    return firstName.length;
}, 'First name cannot be blank');

StudentSchema.path('lastName').validate(function(lastName) {
    return lastName.length;
}, 'Last name cannot be blank');

StudentSchema.path('birthDate').validate(function(birthDate) {
    return birthDate.length;
}, 'Birth date cannot be blank');

/**
 * Statics
 */


mongoose.model('Student', StudentSchema);
