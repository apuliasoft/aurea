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
    street: String,
    zipCode: String,
    city: String,
    province: String
});

/**
 * Validations
 */
ComplexSchema.path('street').validate(function(street) {
    return street.length;
}, 'Street cannot be blank');

ComplexSchema.path('zipCode').validate(function(zipCode) {
    return zipCode.length;
}, 'ZipCode cannot be blank');

ComplexSchema.path('city').validate(function(city) {
    return city.length;
}, 'City cannot be blank');

ComplexSchema.path('province').validate(function(province) {
    return province.length;
}, 'Province cannot be blank');

/**
 * Statics
 */


mongoose.model('Complex', ComplexSchema);
