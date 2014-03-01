/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;

/**
 * SchoolClass Schema
 */
var SchoolClassSchema = new Schema({
    name: String
    //students: [Schema.ObjectId]
    //academicYear: Schema.ObjectId
});

mongoose.model('SchoolClass', SchoolClassSchema);