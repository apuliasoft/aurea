'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Teaching Registry Schema
 */
var TeachingRegistrySchema = new Schema({
    teaching: {
        type: Schema.Types.ObjectId,
        ref: 'Teaching'
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    complex: {
        type: Schema.Types.ObjectId,
        ref: 'Complex',
        required: true
    },
    academicYear: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicYear',
        required: true
    },
    schoolClass: {
        type: Schema.Types.ObjectId,
        ref: 'SchoolClass',
        required: true
    },
    votes: [{
        _id: false,
        student: {
            type: Schema.Types.ObjectId,
            ref: 'Student'
        },
        vote: {
            type: String,
            required: true
        },
        mode: {
            type: String,
            required: true
        },
        partials: [{
            _id: false,
            criterion: String,
            vote: {
                type: String,
                required: true
            }
        }]
    }],
    absences: [{
        _id: false,
        student: {
            type: Schema.Types.ObjectId,
            ref: 'Student'
        },
        slots: Number
    }],
    annotations: String,
    notes: String
});

/**
 * Validations
 */

/**
 * Statics
 */

mongoose.model('TeachingRegistry', TeachingRegistrySchema);