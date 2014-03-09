'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Teacher = mongoose.model('Teacher'),
    _ = require('lodash'),
    /*jshint -W079 */ expect = require('chai').expect;

//Globals
var teacher;

//The tests
describe('<Unit Test>', function() {
    describe('Model Teacher:', function() {
        beforeEach(function(done) {
            teacher = new Teacher({
                firstName: 'Pinco',
                lastName: 'Pallino'
            });

            teacher.save(function(err) {
                if(err) {
                    done(err);
                }
                done();
            });
        });

        describe('Method Find', function() {
            it('should be able to find all teachers', function(done) {
                return Teacher.find({}, function(err, teachers) {
                    should.not.exist(err);
                    expect(teachers.length).to.equal(1);
                    expect(teachers[0].equals(teacher)).to.equal(true);
                    done();
                });
            });

            it('should be able to find a teacher by id', function(done) {
                return Teacher.findById(teacher._id, function(err, teacher) {
                    should.not.exist(err);
                    expect(teacher.equals(teacher)).to.equal(true);
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

                    Teacher.findOne(teacher._id, function(err, teacher) {
                        should.not.exist(err);

                        expect(teacher.equals(teacher)).to.equal(true);
                        expect(teacher.firstName).to.equal(update.firstName);
                        expect(teacher.lastName).to.equal(update.lastName);

                        done();
                    });
                });
            });
        });

        describe('Method Remove', function() {
            it('should be able to remove a teacher', function(done) {
                return teacher.remove(function(err) {
                    should.not.exist(err);
                    Teacher.findById(teacher._id, function(err, teacher) {
                        should.not.exist(err);
                        should.not.exist(teacher);
                        done();
                    });
                });
            });
        });

        afterEach(function(done) {
            Teacher.remove().exec();
            done();
        });
        after(function(done) {
            Teacher.remove().exec();
            done();
        });
    });
});