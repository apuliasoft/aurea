/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;

/**
 * Student Schema
 */
var StudentSchema = new Schema({
    firstName: String,
    lastName: String,
    birthday: Date
});

mongoose.model('Student', StudentSchema);
