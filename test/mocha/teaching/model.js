'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Teaching = mongoose.model('Teaching'),
    Teacher = mongoose.model('Teacher'),
    SchoolClass = mongoose.model('SchoolClass'),
    AcademicYear = mongoose.model('AcademicYear'),
    Student = mongoose.model('Student'),
    Complex = mongoose.model('Complex'),
    School = mongoose.model('School'),
    _ = require('lodash'),
    /*jshint -W079 */ expect = require('chai').expect;

//Globals
var teaching;
var teacher;
var schoolClass;
var student;
var academicYear;
var complex;
var school;

//The tests
describe('<Unit Test>', function() {
    describe('Model Teaching:', function() {
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
                                teacher = new Teacher({
                                    firstName: 'Pinco',
                                    lastName: 'Pallino',
                                    complex: complex
                                });
                                teacher.save(function(err){
                                    if(err){
                                        done(err);
                                    }
                                    teaching = new Teaching({
                                        name: 'Italiano',
                                        teacher: teacher,
                                        schoolClass: schoolClass
                                    });
                                    teaching.save(function(err) {
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
            });
        });

        describe('Method Find', function() {
            it('should be able to find all teachings', function(done) {
                return Teaching.find({}, function(err, teachingsResult) {
                    should.not.exist(err);
                    expect(teachingsResult.length).to.equal(1);
                    expect(teachingsResult[0].equals(teaching)).to.equal(true);
                    done();
                });
            });

            it('should be able to find a teaching by id', function(done) {
                return Teaching.findById(teaching._id, function(err, teachingResult) {
                    should.not.exist(err);
                    expect(teachingResult.equals(teaching)).to.equal(true);
                    done();
                });
            });

            it('should be able to find a teaching\'s teacher', function(done) {
                return Teaching.findById(teaching._id, function(err, teachingResult) {
                    should.not.exist(err);
                    expect(teachingResult.teacher).to.eql(teacher._id);
                    done();
                });
            });

            it('should be able to find a teaching\'s school class', function(done) {
                return Teaching.findById(teaching._id, function(err, teachingResult) {
                    should.not.exist(err);
                    expect(teachingResult.schoolClass).to.eql(schoolClass._id);
                    done();
                });
            });

            it('should be able to find a teaching\'s students', function(done) {
                return Teaching.findById(teaching._id, function(err, teachingResult) {
                    should.not.exist(err);
                    SchoolClass.findById(teachingResult.schoolClass, function(err, schoolClassResult){
                        should.not.exist(err);
                        expect(schoolClassResult.students).to.have.length(1);
                        expect(schoolClassResult.students[0]).to.eql(student._id);
                        done();
                    });
                });
            });

            it('should be able to find a teaching\'s academicYear', function(done) {
                return Teaching.findById(teaching._id, function(err, teachingResult) {
                    should.not.exist(err);
                    SchoolClass.findById(teachingResult.schoolClass, function(err, schoolClassResult){
                        should.not.exist(err);
                        expect(schoolClassResult.academicYear).to.eql(academicYear._id);
                        done();
                    });
                });
            });

            it('should be able to find a teaching\'s complex', function(done) {
                return Teaching.findById(teaching._id, function(err, teachingResult) {
                    should.not.exist(err);
                    Teacher.findById(teachingResult.teacher, function(err, teacherResult){
                        should.not.exist(err);
                        expect(teacherResult.complex).to.eql(complex._id);
                        done();
                    });
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

                    Teaching.findOne(teaching._id, function(err, teachingResult) {
                        should.not.exist(err);

                        expect(teachingResult.equals(teaching)).to.equal(true);
                        expect(teachingResult.name).to.equal(update.name);

                        done();
                    });
                });
            });
        });

        describe('Method Remove', function() {
            it('should be able to remove a teaching', function(done) {
                return teaching.remove(function(err) {
                    should.not.exist(err);
                    Teaching.findById(teaching._id, function(err, teachingResult) {
                        should.not.exist(err);
                        should.not.exist(teachingResult);
                        done();
                    });
                });
            });
        });

        afterEach(function(done) {
            teaching.remove();
            teacher.remove();
            schoolClass.remove();
            student.remove();
            academicYear.remove();
            complex.remove();
            school.remove();
            done();
        });
        after(function(done) {
            Teaching.remove().exec();
            Teacher.remove().exec();
            SchoolClass.remove().exec();
            Student.remove().exec();
            AcademicYear.remove().exec();
            Complex.remove().exec();
            School.remove().exec();
            done();
        });
    });
});