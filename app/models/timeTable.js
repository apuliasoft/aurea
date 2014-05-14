'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Time Table Schema
 */
var TimeTableSchema = new Schema({
    accademicYear: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicYear'
    },
    days: [{
        _id: false,
        day: {
            type: Number,
            min: 0, //da lunedì
            max: 6, //a domenica
            required: true
        },
        // Gli slot sono ordinati dalla prima all'ultima ora
        slots: [{
            _id: false,
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
    }]
});

/**
 * Validations
 */

/**
 * Statics
 */

mongoose.model('TimeTable', TimeTableSchema);