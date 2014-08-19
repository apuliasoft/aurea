'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    AcademicYear = mongoose.model('AcademicYear'),
    School = mongoose.model('School'),
    Complex = mongoose.model('Complex'),
    _ = require('lodash'),
    /*jshint -W079 */ expect = require('chai').expect;

//Globals
var academicYear;
var complex;
var school;

//The tests
describe('<Unit Test>', function() {
    describe('Model AcademicYear:', function() {
        beforeEach(function(done) {
            school = new School({
                name: 'Istituto Tecnico'
            });

            school.save(function(err){
                if (err){
                    done(err);
                }
                complex = new Complex({
                    name: 'Liceo Scientifico',
                    street: 'Via Qualunque 1',
                    zipCode: '12345',
                    city: 'Chissadove',
                    province: 'AZ',
                    school: school
                });
                complex.save(function(err){
                    if (err){
                        done(err);
                    }
                    academicYear = new AcademicYear({
                        name: '2013/2014',
                        startDate: 1234567890000,
                        endDate: 2345678910000,
                        complex: complex,
                        timeTable: [{
                            weekDay: 1,
                            slots:[
                                {start:540, end: 600},
                                {start:600, end: 660}
                            ]
                        },{
                            weekDay: 2,
                            slots:[
                                {start:540, end: 600},
                                {start:600, end: 660}
                            ]
                        }]
                    });
                    academicYear.save(function(err) {
                        if(err) {
                            done(err);
                        }
                        done();
                    });
                });
            });
        });

        describe('Method Find', function() {
            it('should be able to find all academic years', function(done) {
                return AcademicYear.find({}, function(err, result) {
                    should.not.exist(err);
                    expect(result.length).to.equal(1);
                    expect(result[0].equals(academicYear)).to.equal(true);
                    done();
                });
            });

            it('should be able to find a academic year by id', function(done) {
                return AcademicYear.findById(academicYear._id, function(err, result) {
                    should.not.exist(err);
                    expect(result.equals(academicYear)).to.equal(true);
                    done();
                });
            });

            it('should be able to find a academic year\'s complex', function(done) {
                return AcademicYear.findById(academicYear._id).populate('complex').exec(function(err, result) {
                    should.not.exist(err);
                    var resultComplex = new Complex(result.complex);
                    expect(resultComplex.equals(complex)).to.equal(true);
                    done();
                });
            });
        });

        describe('Method Save', function() {
            it('should be able to save an academic year', function(done) {
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

            it('should be able to show an error when try to save with a day greater than 6', function(done) {
                academicYear.timeTable[0].weekDay = 8;

                return academicYear.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save a slot with a wrong type', function(done) {
                academicYear.timeTable[0].slots.push({
                    start: 10,
                    end: '10:00'
                });

                return academicYear.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to update a academicYear', function(done) {
                var update = {
                    name: '2014/2015',
                    startDate: 2345678910000,
                    endDate: 3456789120000,
                    timeTable: [{
                        weekDay: 1,
                        slots:[
                            {start:580, end: 600},
                            {start:600, end: 620}
                        ]
                    },{
                        weekDay: 3,
                        slots:[
                            {start:580, end: 600},
                            {start:600, end: 620}
                        ]
                    }]
                };
                academicYear = _.extend(academicYear, update);

                return academicYear.save(function(err) {
                    should.not.exist(err);

                    AcademicYear.findOne(academicYear._id, function(err, result) {
                        should.not.exist(err);

                        expect(result.equals(academicYear)).to.equal(true);
                        expect(result.name).to.equal(update.name);
                        expect(result.startDate.getTime()).to.equal(update.startDate);
                        expect(result.endDate.getTime()).to.equal(update.endDate);

                        done();
                    });
                });
            });
        });

        describe('Method Remove', function() {
            it('should be able to remove a academicYear', function(done) {
                return academicYear.remove(function(err) {
                    should.not.exist(err);
                    AcademicYear.findById(academicYear._id, function(err, result) {
                        should.not.exist(err);
                        should.not.exist(result);
                        done();
                    });
                });
            });
        });

        afterEach(function(done) {
            academicYear.remove();
            complex.remove();
            school.remove();
            done();
        });
        after(function(done) {
            AcademicYear.remove().exec();
            Complex.remove().exec();
            School.remove().exec();
            done();
        });
    });
});