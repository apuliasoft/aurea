'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Student = mongoose.model('Student'),
    School = mongoose.model('School'),
    Complex = mongoose.model('Complex'),
    _ = require('lodash'),
    /*jshint -W079 */ expect = require('chai').expect;

//Globals
var student;
var complex;
var school;

//The tests
describe('<Unit Test>', function() {
    describe('Model Student:', function() {
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
                    student = new Student({
                        firstName: 'Pinco',
                        lastName: 'Pallino',
                        birthDate: 1234567890000,
                        complex: complex
                    });
                    student.save(function(err) {
                        if(err) {
                            done(err);
                        }
                        done();
                    });
                });
            });
        });

        describe('Method Find', function() {
            it('should be able to find all students', function(done) {
                return Student.find({}, function(err, result) {
                    should.not.exist(err);
                    expect(result.length).to.equal(1);
                    expect(result[0].equals(student)).to.equal(true);
                    done();
                });
            });

            it('should be able to find a student by id', function(done) {
                return Student.findById(student._id, function(err, result) {
                    should.not.exist(err);
                    expect(result.equals(student)).to.equal(true);
                    done();
                });
            });

            it('should be able to find a student\'s complex', function(done) {
                return Student.findById(student._id, function(err, result) {
                    should.not.exist(err);
                    expect(result.complex).to.eql(complex._id);
                    done();
                });
            });
        });

        describe('Method Save', function() {
            it('should be able to save a student', function(done) {
                return student.save(function (err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without first name', function(done) {
                student.firstName = '';

                return student.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without last name', function(done) {
                student.lastName = '';

                return student.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without birth date', function(done) {
                student.birthDate = NaN;

                return student.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to update a student', function(done) {
                var update = {
                    firstName: 'Abra',
                    lastName: 'Cadabra',
                    birthDate: 2345678910000
                };
                student = _.extend(student, update);

                return student.save(function(err) {
                    should.not.exist(err);

                    Student.findOne(student._id, function(err, result) {
                        should.not.exist(err);

                        expect(result.equals(student)).to.equal(true);
                        expect(result.firstName).to.equal(update.firstName);
                        expect(result.lastName).to.equal(update.lastName);
                        expect(result.birthDate.getTime()).to.equal(update.birthDate);

                        done();
                    });
                });
            });
        });

        describe('Method Remove', function() {
            it('should be able to remove a student', function(done) {
                return student.remove(function(err) {
                    should.not.exist(err);
                    Student.findById(student._id, function(err, result) {
                        should.not.exist(err);
                        should.not.exist(result);
                        done();
                    });
                });
            });
        });

        afterEach(function(done) {
            student.remove();
            complex.remove();
            school.remove();
            done();
        });
        after(function(done) {
            Student.remove().exec();
            Complex.remove().exec();
            School.remove().exec();
            done();
        });
    });
});