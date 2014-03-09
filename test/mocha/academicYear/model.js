'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    AcademicYear = mongoose.model('AcademicYear'),
    _ = require('lodash'),
    /*jshint -W079 */ expect = require('chai').expect;

//Globals
var academicYear;

//The tests
describe('<Unit Test>', function() {
    describe('Model AcademicYear:', function() {
        beforeEach(function(done) {
            academicYear = new AcademicYear({
                name: '2013/2014',
                startDate: 1234567890000,
                endDate: 2345678910000
            });

            academicYear.save(function(err) {
                if(err) {
                    done(err);
                }
                done();
            });
        });

        describe('Method Find', function() {
            it('should be able to find all academic years', function(done) {
                return AcademicYear.find({}, function(err, academicYears) {
                    should.not.exist(err);
                    expect(academicYears.length).to.equal(1);
                    expect(academicYears[0].equals(academicYear)).to.equal(true);
                    done();
                });
            });

            it('should be able to find a academic year by id', function(done) {
                return AcademicYear.findById(academicYear._id, function(err, academicYear) {
                    should.not.exist(err);
                    expect(academicYear.equals(academicYear)).to.equal(true);
                    done();
                });
            });
        });

        describe('Method Save', function() {
            it('should be able to save a academic year', function(done) {
                return academicYear.save(function (err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without name', function(done) {
                academicYear.name = '';

                return academicYear.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without start date', function(done) {
                academicYear.startDate = NaN;

                return academicYear.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without end date', function(done) {
                academicYear.endDate = NaN;

                return academicYear.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to update a academicYear', function(done) {
                var update = {
                    name: '2014/2015',
                    startDate: 2345678910000,
                    endDate: 3456789120000
                };
                academicYear = _.extend(academicYear, update);

                return academicYear.save(function(err) {
                    should.not.exist(err);

                    AcademicYear.findOne(academicYear._id, function(err, academicYear) {
                        should.not.exist(err);

                        expect(academicYear.equals(academicYear)).to.equal(true);
                        expect(academicYear.name).to.equal(update.name);
                        expect(academicYear.startDate.getTime()).to.equal(update.startDate);
                        expect(academicYear.endDate.getTime()).to.equal(update.endDate);

                        done();
                    });
                });
            });
        });

        describe('Method Remove', function() {
            it('should be able to remove a academicYear', function(done) {
                return academicYear.remove(function(err) {
                    should.not.exist(err);
                    AcademicYear.findById(academicYear._id, function(err, academicYear) {
                        should.not.exist(err);
                        should.not.exist(academicYear);
                        done();
                    });
                });
            });
        });

        afterEach(function(done) {
            AcademicYear.remove().exec();
            done();
        });
        after(function(done) {
            AcademicYear.remove().exec();
            done();
        });
    });
});