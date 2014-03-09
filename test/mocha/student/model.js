'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Student = mongoose.model('Student'),
    _ = require('lodash'),
    /*jshint -W079 */ expect = require('chai').expect;

//Globals
var student;

//The tests
describe('<Unit Test>', function() {
    describe('Model Student:', function() {
        beforeEach(function(done) {
            student = new Student({
                firstName: 'Pinco',
                lastName: 'Pallino',
                birthDate: 1234567890000
            });

            student.save(function(err) {
                if(err) {
                    done(err);
                }
                done();
            });
        });

        describe('Method Find', function() {
            it('should be able to find all students', function(done) {
                return Student.find({}, function(err, students) {
                    should.not.exist(err);
                    expect(students.length).to.equal(1);
                    expect(students[0].equals(student)).to.equal(true);
                    done();
                });
            });

            it('should be able to find a student by id', function(done) {
                return Student.findById(student._id, function(err, student) {
                    should.not.exist(err);
                    expect(student.equals(student)).to.equal(true);
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

                    Student.findOne(student._id, function(err, student) {
                        should.not.exist(err);

                        expect(student.equals(student)).to.equal(true);
                        expect(student.firstName).to.equal(update.firstName);
                        expect(student.lastName).to.equal(update.lastName);
                        expect(student.birthDate.getTime()).to.equal(update.birthDate);

                        done();
                    });
                });
            });
        });

        describe('Method Remove', function() {
            it('should be able to remove a student', function(done) {
                return student.remove(function(err) {
                    should.not.exist(err);
                    Student.findById(student._id, function(err, student) {
                        should.not.exist(err);
                        should.not.exist(student);
                        done();
                    });
                });
            });
        });

        afterEach(function(done) {
            Student.remove().exec();
            done();
        });
        after(function(done) {
            Student.remove().exec();
            done();
        });
    });
});