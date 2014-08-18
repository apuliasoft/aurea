'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * School Schema
 */
var SchoolSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    complexes: [{
        type: Schema.Types.ObjectId,
        ref: 'Complex'
    }]
});

/**
 * Validations
 */

/**
 * Statics
 */

SchoolSchema.statics.loadWithComplexes = function(id, callback){
    this.findOne({
        _id: id
    }).populate('complexes').exec(callback);
};

SchoolSchema.statics.load = function(id, callback){
    this.findOne({
        _id: id
    }).exec(callback);
};


mongoose.model('School', SchoolSchema);