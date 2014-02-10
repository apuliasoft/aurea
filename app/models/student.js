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
    birthDate: Date
//    school: Schema.ObjectId
});

mongoose.model('Student', StudentSchema);
