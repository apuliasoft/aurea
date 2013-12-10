/**
 * Module dependencies.
 */
var should = require('should'),
    assert = require("assert"),
    expect = require('chai').expect,
    app = require('../../../server'),
    util = require('util'),
    mongoose = require('mongoose'),
    School = mongoose.model('School'),
    Complex = mongoose.model('Complex');

//Globals
var school;
var complex;


//The tests
describe('Model School:', function () {

    describe('Save a school', function () {
        beforeEach(function (done) {
            school = new School({
                name: 'Istito Tecnico'
            });

            done();
        });

        it('should be able to save without problems', function (done) {
            return school.save(function (err) {
                should.not.exist(err);
                done();
            });
        });

        it('should be able to show an error when try to save without name', function (done) {
            school.name = '';

            return school.save(function (err) {
                should.exist(err);
                done();
            });
        });

        afterEach(function (done) {
            School.remove({});
            done();
        });
    });

    describe('Save a school with complexes', function() {
        before(function (done) {
            school = new School({
                name: 'Istito Tecnico'
            });

            complex = new Complex({
                address: 'via basento, 10',
                zipCode: '70022',
                city: 'Altamura',
                province: 'BA'
            });

            done();
        });

        it('should be able to save a school with complex', function(done) {
            var complexes = [];
            complexes.push(complex);
            school.complexes = complexes;

            school.save(function (err) {
                should.not.exist(err);
                done();
            });
        });

        it('should be able to get the school just saved', function(done) {
            School.findById(school._id, function(err, savedSchool) {
                should.not.exist(err);
                done();
            });
        });

        it('the school should be equal to the saved school', function(done) {
            School.findById(school._id, function(err, savedSchool) {
                should.not.exist(err);

                expect(school.equals(savedSchool)).to.equal(true);
                done();
            });
        });

        it('the saved school should have 1 complex', function(done) {
            School.findById(school._id, function(err, savedSchool) {
                should.not.exist(err);

                expect(savedSchool.complexes.length).to.equal(1);
                done();
            });
        });

        after(function (done) {
            School.remove();
            done();
        });
    });
});