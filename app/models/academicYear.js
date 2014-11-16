'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * AcademicYear Schema
 */
var AcademicYearSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    timeTable: [{
        _id: false,
        weekDay: {
            type: Number,
            min: 0, //da domenica
            max: 6, //a sabato
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
    }],
    complex: {
        type: Schema.Types.ObjectId,
        ref: 'Complex'
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School'
    }
});

/**
 * Validations
 */

/**
 * Statics
 */

mongoose.model('AcademicYear', AcademicYearSchema);



