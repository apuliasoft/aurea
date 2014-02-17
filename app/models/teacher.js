/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;

/**
 * Student Schema
 */
var TeacherSchema = new Schema({
    firstName: String,
    lastName: String
    // school: Schema.ObjectId
});

mongoose.model('Teacher', TeacherSchema);
