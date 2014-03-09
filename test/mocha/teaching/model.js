'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Teaching = mongoose.model('Teaching'),
    _ = require('lodash'),
    /*jshint -W079 */ expect = require('chai').expect;

//Globals
var teaching;

//The tests
describe('<Unit Test>', function() {
    describe('Model Teaching:', function() {
        beforeEach(function(done) {
            teaching = new Teaching({
                name: 'Italiano'
            });

            teaching.save(function(err) {
                if(err) {
                    done(err);
                }
                done();
            });
        });

        describe('Method Find', function() {
            it('should be able to find all teachings', function(done) {
                return Teaching.find({}, function(err, teachings) {
                    should.not.exist(err);
                    expect(teachings.length).to.equal(1);
                    expect(teachings[0].equals(teaching)).to.equal(true);
                    done();
                });
            });

            it('should be able to find a teaching by id', function(done) {
                return Teaching.findById(teaching._id, function(err, teaching) {
                    should.not.exist(err);
                    expect(teaching.equals(teaching)).to.equal(true);
                    done();
                });
            });
        });

        describe('Method Save', function() {
            it('should be able to save a teaching', function(done) {
                return teaching.save(function (err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without name', function(done) {
                teaching.name = '';

                return teaching.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to update a teaching', function(done) {
                var update = {
                    name: 'Matematica'
                };
                teaching = _.extend(teaching, update);

                return teaching.save(function(err) {
                    should.not.exist(err);

                    Teaching.findOne(teaching._id, function(err, teaching) {
                        should.not.exist(err);

                        expect(teaching.equals(teaching)).to.equal(true);
                        expect(teaching.name).to.equal(update.name);

                        done();
                    });
                });
            });
        });

        describe('Method Remove', function() {
            it('should be able to remove a teaching', function(done) {
                return teaching.remove(function(err) {
                    should.not.exist(err);
                    Teaching.findById(teaching._id, function(err, teaching) {
                        should.not.exist(err);
                        should.not.exist(teaching);
                        done();
                    });
                });
            });
        });

        afterEach(function(done) {
            Teaching.remove().exec();
            done();
        });
        after(function(done) {
            Teaching.remove().exec();
            done();
        });
    });
});