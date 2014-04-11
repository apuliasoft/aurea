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
    //schoolClass: { type: Schema.Types.ObjectId, ref: 'SchoolClass' },
    day: {
        type: Date,
        required: true
    },
    // absences: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    slots: [{
        _id: false,
        // number: { type: Number, required: true }, // Es. 1a ora, 2a ora, ecc. ecc.
        // teaching: { type: Schema.Types.ObjectId, ref: 'Teaching' },
        notes: String,
        subject: String,
        substitution: {
            type: Boolean,
            required: true
        }
        // supportTeachers: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }], // compresenza
        // assistantTeachers: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }] // sostegno
    }]
});

/**
 * Validations
 */

/**
 * Statics
 */

mongoose.model('ClassRegistry', ClassRegistrySchema);