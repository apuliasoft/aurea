'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    SchoolClass = mongoose.model('SchoolClass'),
    _ = require('lodash'),
    /*jshint -W079 */ expect = require('chai').expect;

//Globals
var schoolClass;

//The tests
describe('<Unit Test>', function() {
    describe('Model SchoolClass:', function() {
        beforeEach(function(done) {
            schoolClass = new SchoolClass({
                name: '1A'
            });

            schoolClass.save(function(err) {
                if(err) {
                    done(err);
                }
                done();
            });
        });

        describe('Method Find', function() {
            it('should be able to find all school classes', function(done) {
                return SchoolClass.find({}, function(err, schoolClasses) {
                    should.not.exist(err);
                    expect(schoolClasses.length).to.equal(1);
                    expect(schoolClasses[0].equals(schoolClass)).to.equal(true);
                    done();
                });
            });

            it('should be able to find a school class by id', function(done) {
                return SchoolClass.findById(schoolClass._id, function(err, schoolClass) {
                    should.not.exist(err);
                    expect(schoolClass.equals(schoolClass)).to.equal(true);
                    done();
                });
            });
        });

        describe('Method Save', function() {
            it('should be able to save a schoolClass', function(done) {
                return schoolClass.save(function (err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without name', function(done) {
                schoolClass.name = '';

                return schoolClass.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to update a schoolClass', function(done) {
                var update = {
                    name: '2B'
                };
                schoolClass = _.extend(schoolClass, update);

                return schoolClass.save(function(err) {
                    should.not.exist(err);

                    SchoolClass.findOne(schoolClass._id, function(err, schoolClass) {
                        should.not.exist(err);

                        expect(schoolClass.equals(schoolClass)).to.equal(true);
                        expect(schoolClass.name).to.equal(update.name);

                        done();
                    });
                });
            });
        });

        describe('Method Remove', function() {
            it('should be able to remove a schoolClass', function(done) {
                return schoolClass.remove(function(err) {
                    should.not.exist(err);
                    SchoolClass.findById(schoolClass._id, function(err, schoolClass) {
                        should.not.exist(err);
                        should.not.exist(schoolClass);
                        done();
                    });
                });
            });
        });

        afterEach(function(done) {
            SchoolClass.remove().exec();
            done();
        });
        after(function(done) {
            SchoolClass.remove().exec();
            done();
        });
    });
});