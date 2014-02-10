/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;

/**
 * AcademicYear Schema
 */
var AcademicYearSchema = new Schema({
    name: String,
    startDate: Date,
    endDate: Date
//    school: Schema.ObjectId
});

mongoose.model('AcademicYear', AcademicYearSchema);
