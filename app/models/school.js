/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
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

mongoose.model('School', SchoolSchema);