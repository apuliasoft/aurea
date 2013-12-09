/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;

/**
 * School Schema
 */
var SchoolSchema = new Schema({
    name: String
});

/**
 * Validations
 */
SchoolSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

mongoose.model('School', SchoolSchema);