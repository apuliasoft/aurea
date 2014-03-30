'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * TimeTable Schema
 */
var TimeTableSchema = new Schema({
    day:{
        type: Number,
        min: 0, //da lunedì
        max: 6, //a domenica
        required: true
    },
    // Gli slot sono ordinati dalla prima all'ultima ora
    slots: [{
        start:{
            type: Number,
            min: 0, //mezzanotte
            max: 1439, //le 23:59
            required: true
        },
        end:{
            type: Number,
            min: 0,
            max: 1439,
            required: true
        }
    }]
    // accademicYear: Schema.ObjectId
});

/**
 * Validations
 */

/**
 * Statics
 */

mongoose.model('TimeTable', TimeTableSchema);