'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Student Schema
 */
var StudentSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    parents: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    complex: {
        type: Schema.Types.ObjectId,
        ref: 'Complex',
        required: true
    }
});

/**
 * Validations
 */

/**
 * Statics
 */

mongoose.model('Student', StudentSchema);
