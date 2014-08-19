'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    ClassRegistry = mongoose.model('ClassRegistry'),
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
var classRegistry;
var teaching;
var teacher;
var schoolClass;
var student;
var academicYear;
var complex;
var school;

//The tests
describe('<Unit Test>', function() {
    describe('Model ClassRegistry:', function() {
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
                                        classRegistry = new ClassRegistry({
                                            schoolClass: schoolClass,
                                            date: 1234567890000,
                                            absences: [student],
                                            slots: [{
                                                number: 1,
                                                teaching: teaching,
                                                notes: 'nota1',
                                                subject: 'I promessi sposi',
                                                substitution: teacher,
                                                supportTeachers: [teacher],
                                                assistantTeachers: [teacher]
                                            }]
                                        });
                                        classRegistry.save(function(err){
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
        });

        describe('Method Find', function() {
            it('should be able to find all class registries', function(done) {
                return ClassRegistry.find({}, function(err, classRegistriesResult) {
                    should.not.exist(err);
                    expect(classRegistriesResult.length).to.equal(1);
                    expect(classRegistriesResult[0].equals(classRegistry)).to.equal(true);
                    done();
                });
            });

            it('should be able to find a class registry by id', function(done) {
                return ClassRegistry.findById(classRegistry._id, function(err, classRegistryResult) {
                    should.not.exist(err);
                    expect(classRegistryResult.equals(classRegistry)).to.equal(true);
                    done();
                });
            });

            it('should be able to find a class registry\'s school class', function(done) {
                return ClassRegistry.findById(classRegistry._id, function(err, classRegistryResult) {
                    should.not.exist(err);
                    expect(classRegistryResult.schoolClass).to.eql(schoolClass._id);
                    done();
                });
            });

            it('should be able to find a class registry\'s absent students', function(done) {
                return ClassRegistry.findById(classRegistry._id, function(err, classRegistryResult) {
                    should.not.exist(err);
                    expect(classRegistryResult.absences).to.have.length(1);
                    expect(classRegistryResult.absences[0]).to.eql(student._id);
                    done();
                });
            });

            it('should be able to find a class registry\'s slots', function(done) {
                return ClassRegistry.findById(classRegistry._id, function(err, classRegistryResult) {
                    should.not.exist(err);
                    expect(classRegistryResult.slots).to.have.length(1);
                    expect(classRegistryResult.slots[0].teaching).to.eql(teaching._id);
                    expect(classRegistryResult.slots[0].supportTeachers[0]).to.eql(teacher._id);
                    done();
                });
            });
        });

        describe('Method Save', function() {
            it('should be able to save a class registry', function(done) {
                return classRegistry.save(function (err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without date', function(done) {
                classRegistry.date = NaN;

                return classRegistry.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without slot number', function(done) {
                classRegistry.slots[0].number = null;

                return classRegistry.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to update a class registry', function(done) {
                var update = {
                    date: 1234987650000
                };
                classRegistry = _.extend(classRegistry, update);

                return classRegistry.save(function(err) {
                    should.not.exist(err);

                    ClassRegistry.findOne(classRegistry._id, function(err, classRegistryResult) {
                        should.not.exist(err);

                        expect(classRegistryResult.equals(classRegistry)).to.equal(true);
                        expect(classRegistryResult.date).to.eql(new Date(update.date));

                        done();
                    });
                });
            });
        });

        describe('Method Remove', function() {
            it('should be able to remove a class registry', function(done) {
                return classRegistry.remove(function(err) {
                    should.not.exist(err);
                    ClassRegistry.findById(classRegistry._id, function(err, classRegistryResult) {
                        should.not.exist(err);
                        should.not.exist(classRegistryResult);
                        done();
                    });
                });
            });
        });

        afterEach(function(done) {
            classRegistry.remove();
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
            ClassRegistry.remove().exec();
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