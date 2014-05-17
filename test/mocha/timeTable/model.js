'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    TimeTable = mongoose.model('TimeTable'),
    AcademicYear = mongoose.model('AcademicYear'),
    School = mongoose.model('School'),
    Complex = mongoose.model('Complex'),
/*jshint -W079 */ expect = require('chai').expect;

//Globals
var timeTable;
var academicYear;
var complex;
var school;

//The tests
describe('<Unit Test>', function() {
    describe('Model TimeTable:', function() {
        beforeEach(function(done) {
            school = new School({
                name: 'Istituto Tecnico'
            });

            school.save(function(err){
                if (err){
                    done(err);
                }
                complex = new Complex({
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
                        complex: complex
                    });
                    academicYear.save(function(err) {
                        if(err) {
                            done(err);
                        }
                        timeTable = new TimeTable({
                            academicYear: academicYear,
                            days: [{
                                day: 0,
                                slots:[
                                    {start:540, end: 600},
                                    {start:600, end: 660}
                                ]
                            },{
                                day: 1,
                                slots:[
                                    {start:540, end: 600},
                                    {start:600, end: 660}
                                ]
                            }]
                        });
                        timeTable.save(function(err) {
                            if(err) {
                                done(err);
                            }
                            done();
                        });
                    });
                });
            });
        });

        describe('Method Find', function() {
            it('should be able to find all time tables', function(done) {
                return TimeTable.find({}, function(err, result) {
                    should.not.exist(err);
                    expect(result.length).to.equal(1);
                    expect(result[0].equals(timeTable)).to.equal(true);
                    done();
                });
            });

            it('should be able to find a time table by id', function(done) {
                return TimeTable.findById(timeTable._id, function(err, result) {
                    should.not.exist(err);
                    expect(result.equals(timeTable)).to.equal(true);
                    done();
                });
            });

            it('should be able to find a time table\'s academic year', function(done) {
                return TimeTable.findById(timeTable._id, function(err, result) {
                    should.not.exist(err);
                    expect(result.academicYear).to.eql(academicYear._id);
                    done();
                });
            });

            it('should be able to find a time table\'s complex', function(done) {
                return TimeTable.findById(timeTable._id, function(err, timetableResult) {
                    should.not.exist(err);

                    AcademicYear.findById(timetableResult.academicYear, function(err, academicYearResult){
                        should.not.exist(err);
                        expect(academicYearResult.complex).to.eql(complex._id);
                        done();
                    });
                });
            });

            it('should be able to find a time table\'s school', function(done) {
                return TimeTable.findById(timeTable._id, function(err, timetableResult) {
                    should.not.exist(err);
                    AcademicYear.findById(timetableResult.academicYear, function(err, academicYearResult){
                        should.not.exist(err);
                        Complex.findById(academicYearResult.complex, function(err, complexResult){
                            should.not.exist(err);
                            expect(complexResult.school).to.eql(school._id);
                            done();
                        });
                    });
                });
            });
        });

        describe('Method Save', function() {
            it('should be able to save a time table', function(done) {
                return timeTable.save(function (err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save with a day greater than 6', function(done) {
                timeTable.days[0].day = 8;

                return timeTable.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save a slot with a wrong type', function(done) {
                timeTable.days[0].slots.push({
                    start: 10,
                    end: '10:00'
                });

                return timeTable.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to update the time table', function(done) {
                var newDay = 2;
                timeTable.days[0].day = newDay;

                return timeTable.save(function(err) {
                    should.not.exist(err);

                    TimeTable.findOne(timeTable._id, function(err, result) {
                        should.not.exist(err);

                        expect(result.equals(timeTable)).to.equal(true);
                        expect(result.days[0].day).to.equal(newDay);

                        done();
                    });
                });
            });
        });

        describe('Method Remove', function() {
            it('should be able to remove a time table', function(done) {
                return timeTable.remove(function(err) {
                    should.not.exist(err);
                    TimeTable.findById(timeTable._id, function(err, result) {
                        should.not.exist(err);
                        should.not.exist(result);
                        done();
                    });
                });
            });
        });

        afterEach(function(done) {
            timeTable.remove();
            academicYear.remove();
            complex.remove();
            school.remove();
            done();
        });
        after(function(done) {
            TimeTable.remove().exec();
            AcademicYear.remove().exec();
            Complex.remove().exec();
            School.remove().exec();
            done();
        });
    });
});