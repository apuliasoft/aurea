'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    School = mongoose.model('School'),
    Complex = mongoose.model('Complex'),
    _ = require('lodash'),
    /*jshint -W079 */ expect = require('chai').expect;

//Globals
var school;
var complex;

//The tests
describe('<Unit Test>', function() {
    describe('Model School:', function() {
        beforeEach(function(done) {
            complex = new Complex({
                name: 'Liceo Scientifico',
                street: 'Via Qualunque 1',
                zipCode: '12345',
                city: 'Chissadove',
                province: 'AZ'
            });

            complex.save(function(err){
                if (err){
                    done(err);
                }
                school = new School({
                    name: 'Istituto Tecnico',
                    complexes: [complex]
                });
                school.save(function(err) {
                    if(err) {
                        done(err);
                    }
                    done();
                });
            });
        });

        describe('Method Find', function() {
            it('should be able to find all schools', function(done) {
                return School.find({}, function(err, result) {
                    should.not.exist(err);
                    expect(result.length).to.equal(1);
                    expect(result[0].equals(school)).to.equal(true);
                    done();
                });
            });

            it('should be able to find a school by id', function(done) {
                return School.findById(school._id, function(err, result) {
                    should.not.exist(err);
                    expect(result.equals(school)).to.equal(true);
                    done();
                });
            });

            it('should be able to find a school\'s complexes', function(done) {
                return School.findById(school._id).populate('complexes').exec(function(err, schoolResult) {
                    should.not.exist(err);
                    var resultComplexes = schoolResult.complexes;
                    expect(resultComplexes).to.have.length(1);
                    expect(resultComplexes[0].equals(complex)).to.equal(true);
                    done();
                });
            });
        });

        describe('Method Save', function() {
            it('should be able to save a school', function(done) {
                return school.save(function (err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without name', function(done) {
                school.name = '';

                return school.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to update a school', function(done) {
                var update = {
                    name: 'Liceo Classico'
                };
                school = _.extend(school, update);

                return school.save(function(err) {
                    should.not.exist(err);

                    School.findOne(school._id, function(err, result) {
                        should.not.exist(err);

                        expect(result.equals(school)).to.equal(true);
                        expect(result.name).to.equal(update.name);

                        done();
                    });
                });
            });
        });

        describe('Method Remove', function() {
            it('should be able to remove a school', function(done) {
                return school.remove(function(err) {
                    should.not.exist(err);
                    School.findById(school._id, function(err, result) {
                        should.not.exist(err);
                        should.not.exist(result);
                        done();
                    });
                });
            });
        });

        afterEach(function(done) {
            school.remove();
            done();
        });
        after(function(done) {
            School.remove().exec();
            done();
        });
    });
});