/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;

/**
 * Complex Schema
 */
var ComplexSchema = new Schema({
    address: String,
    zipCode: String,
    city: String,
    province: String
});

/**
 * Validations
 */
ComplexSchema.path('address').validate(function(address) {
    return address.length;
}, 'Address cannot be blank');

ComplexSchema.path('zipCode').validate(function(zipCode) {
    return zipCode.length;
}, 'ZipCode cannot be blank');

ComplexSchema.path('city').validate(function(city) {
    return city.length;
}, 'City cannot be blank');

ComplexSchema.path('province').validate(function(province) {
    return province.length;
}, 'Province cannot be blank');

mongoose.model('Complex', ComplexSchema);