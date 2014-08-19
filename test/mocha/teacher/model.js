'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Teacher = mongoose.model('Teacher'),
    School = mongoose.model('School'),
    Complex = mongoose.model('Complex'),
    _ = require('lodash'),
    /*jshint -W079 */ expect = require('chai').expect;

//Globals
var teacher;
var complex;
var school;

//The tests
describe('<Unit Test>', function() {
    describe('Model Teacher:', function() {
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
                    teacher = new Teacher({
                        firstName: 'Pinco',
                        lastName: 'Pallino',
                        complex: complex
                    });
                    teacher.save(function(err) {
                        if(err) {
                            done(err);
                        }
                        done();
                    });
                });
            });
        });

        describe('Method Find', function() {
            it('should be able to find all teachers', function(done) {
                return Teacher.find({}, function(err, result) {
                    should.not.exist(err);
                    expect(result.length).to.equal(1);
                    expect(result[0].equals(teacher)).to.equal(true);
                    done();
                });
            });

            it('should be able to find a teacher by id', function(done) {
                return Teacher.findById(teacher._id, function(err, result) {
                    should.not.exist(err);
                    expect(result.equals(teacher)).to.equal(true);
                    done();
                });
            });

            it('should be able to find a teacher\'s complex', function(done) {
                return Teacher.findById(teacher._id, function(err, result) {
                    should.not.exist(err);
                    expect(result.complex).to.eql(complex._id);
                    done();
                });
            });
        });

        describe('Method Save', function() {
            it('should be able to save a teacher', function(done) {
                return teacher.save(function (err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without first name', function(done) {
                teacher.firstName = '';

                return teacher.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without last name', function(done) {
                teacher.lastName = '';

                return teacher.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to update a teacher', function(done) {
                var update = {
                    firstName: 'Abra',
                    lastName: 'Cadabra'
                };
                teacher = _.extend(teacher, update);

                return teacher.save(function(err) {
                    should.not.exist(err);

                    Teacher.findOne(teacher._id, function(err, result) {
                        should.not.exist(err);

                        expect(result.equals(teacher)).to.equal(true);
                        expect(result.firstName).to.equal(update.firstName);
                        expect(result.lastName).to.equal(update.lastName);

                        done();
                    });
                });
            });
        });

        describe('Method Remove', function() {
            it('should be able to remove a teacher', function(done) {
                return teacher.remove(function(err) {
                    should.not.exist(err);
                    Teacher.findById(teacher._id, function(err, result) {
                        should.not.exist(err);
                        should.not.exist(result);
                        done();
                    });
                });
            });
        });

        afterEach(function(done) {
            teacher.remove();
            complex.remove();
            school.remove();
            done();
        });
        after(function(done) {
            Teacher.remove().exec();
            Complex.remove().exec();
            School.remove().exec();
            done();
        });
    });
});