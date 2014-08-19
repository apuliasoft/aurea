'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    SchoolClass = mongoose.model('SchoolClass'),
    AcademicYear = mongoose.model('AcademicYear'),
    Student = mongoose.model('Student'),
    Complex = mongoose.model('Complex'),
    School = mongoose.model('School'),
    _ = require('lodash'),
    /*jshint -W079 */ expect = require('chai').expect;

//Globals
var schoolClass;
var student;
var academicYear;
var complex;
var school;

//The tests
describe('<Unit Test>', function() {
    describe('Model SchoolClass:', function() {
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
                complex.save(function(err) {
                    if (err) {
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
                    academicYear.save(function(err){
                        if (err) {
                            done(err);
                        }
                        student = new Student({
                            firstName: 'Pinco',
                            lastName: 'Pallino',
                            birthDate: 1234567890000,
                            complex: complex
                        });
                        student.save(function(err){
                            if (err) {
                                done(err);
                            }
                            schoolClass = new SchoolClass({
                                name: '1A',
                                students: [student],
                                academicYear: academicYear
                            });
                            schoolClass.save(function(err) {
                                if(err) {
                                    done(err);
                                }
                                done();
                            });
                        });
                    });
                });
            });
        });

        describe('Method Find', function() {
            it('should be able to find all school classes', function(done) {
                return SchoolClass.find({}, function(err, schoolClassResult) {
                    should.not.exist(err);
                    expect(schoolClassResult.length).to.equal(1);
                    expect(schoolClassResult[0].equals(schoolClass)).to.equal(true);
                    done();
                });
            });

            it('should be able to find a school class by id', function(done) {
                return SchoolClass.findById(schoolClass._id, function(err, schoolClassResult) {
                    should.not.exist(err);
                    expect(schoolClassResult.equals(schoolClass)).to.equal(true);
                    done();
                });
            });

            it('should be able to find a school class\'s academic year', function(done) {
                return SchoolClass.findById(schoolClass._id, function(err, schoolClassResult) {
                    should.not.exist(err);
                    expect(schoolClassResult.academicYear).to.eql(academicYear._id);
                    done();
                });
            });

            it('should be able to find a school class\'s students', function(done) {
                return SchoolClass.findById(schoolClass._id, function(err, schoolClassResult) {
                    should.not.exist(err);
                    expect(schoolClassResult.students).to.have.length(1);
                    expect(schoolClassResult.students[0]).to.eql(student._id);
                    done();
                });
            });

            it('should be able to find a school class\'s complex', function(done) {
                return SchoolClass.findById(schoolClass._id, function(err, schoolClassResult) {
                    should.not.exist(err);
                    AcademicYear.findById(schoolClassResult.academicYear, function(err, academicYearResult){
                        should.not.exist(err);
                        expect(academicYearResult.complex).to.eql(complex._id);
                        done();
                    });
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

                    SchoolClass.findOne(schoolClass._id, function(err, schoolClassResult) {
                        should.not.exist(err);

                        expect(schoolClassResult.equals(schoolClass)).to.equal(true);
                        expect(schoolClassResult.name).to.equal(update.name);

                        done();
                    });
                });
            });
        });

        describe('Method Remove', function() {
            it('should be able to remove a schoolClass', function(done) {
                return schoolClass.remove(function(err) {
                    should.not.exist(err);
                    SchoolClass.findById(schoolClass._id, function(err, schoolClassResult) {
                        should.not.exist(err);
                        should.not.exist(schoolClassResult);
                        done();
                    });
                });
            });
        });

        afterEach(function(done) {
            schoolClass.remove();
            academicYear.remove();
            student.remove();
            complex.remove();
            school.remove();
            done();
        });
        after(function(done) {
            SchoolClass.remove().exec();
            AcademicYear.remove().exec();
            Student.remove().exec();
            Complex.remove().exec();
            School.remove().exec();
            done();
        });
    });
});