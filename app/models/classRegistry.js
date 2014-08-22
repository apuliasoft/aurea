'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Class Registry Schema
 */
var ClassRegistrySchema = new Schema({
    schoolClass: {
        type: Schema.Types.ObjectId,
        ref: 'SchoolClass'
    },
    date: {
        type: Date,
        required: true
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School'
    },
    complex: {
        type: Schema.Types.ObjectId,
        ref: 'Complex'
    },
    academicYear: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicYear'
    },
    absences: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }],
    slots: [{
        _id: false,
        number: {
            type: Number,
            required: true
        }, // Es. 1a ora, 2a ora, ecc. ecc.
        teaching: {
            type: Schema.Types.ObjectId,
            ref: 'Teaching'
        },
        subject: String,
        notes: String,
        substitution: {
            type: Schema.Types.ObjectId,
            ref: 'Teacher'
        }, // supplenza
        supportTeachers: [{
            type: Schema.Types.ObjectId,
            ref: 'Teacher'
        }], // compresenza
        assistantTeachers: [{
            type: Schema.Types.ObjectId,
            ref: 'Teacher'
        }] // sostegno
    }],
    lateEntrances: [{
        _id: false,
        student: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Student'
        },
        timestamp: {
            type: Number,
            min: 0, //mezzanotte
            max: 1439, //le 23:59
            required: true
        }
    }],
    earlyLeaves: [{
        _id: false,
        student: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Student'
        },
        timestamp: {
            type: Number,
            min: 0, //mezzanotte
            max: 1439, //le 23:59
            required: true
        }
    }]
});

/**
 * Validations
 */

/**
 * Statics
 */

mongoose.model('ClassRegistry', ClassRegistrySchema);