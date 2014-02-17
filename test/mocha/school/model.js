/**
 * Module dependencies.
 */
var should = require('should'),
    expect = require('chai').expect,
    app = require('../../../server'),
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
                name: 'Istituto Tecnico'
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
                name: 'Istituto Tecnico'
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

    describe('Update a saved school', function() {

        var schoolData = {
            name: 'Istituto Tecnico',
            complexes: [{
                address: 'via basento, 10',
                zipCode: '70022',
                city: 'Altamura',
                province: 'BA'
            }]
        };

        before(function(done) {
            school = new School(schoolData);

            school.save(function(err) {
                if (err) {
                    return done(err);
                }

                done();
            });
        });

        it('Should update the name of the school by set a new school object', function(done) {
            schoolData.name = 'Liceo Classico';
            school.set(schoolData);

            school.save(function(err) {
                should.not.exist(err);

                School.findOne(school._id, function(err, savedSchool) {
                    should.not.exist(err);

                    expect(savedSchool.equals(school)).to.equal(true);
                    expect(savedSchool.name).to.equal(schoolData.name);
                    expect(savedSchool.toObject().complexes[0].address).to.equal(schoolData.complexes[0].address);
                    expect(savedSchool.toObject().complexes[0].zipCode).to.equal(schoolData.complexes[0].zipCode);
                    expect(savedSchool.toObject().complexes[0].city).to.equal(schoolData.complexes[0].city);
                    expect(savedSchool.toObject().complexes[0].province).to.equal(schoolData.complexes[0].province);

                    done();
                });
            });
        });

        it('Should update the name of the school by set just the name', function(done) {
            schoolData.name = 'Liceo Scentifico';
            school.set({name: schoolData.name});

            school.save(function(err) {
                should.not.exist(err);

                School.findOne(school._id, function(err, savedSchool) {
                    should.not.exist(err);

                    expect(savedSchool.equals(school)).to.equal(true);
                    expect(savedSchool.name).to.equal(schoolData.name);
                    expect(savedSchool.toObject().complexes[0].address).to.equal(schoolData.complexes[0].address);
                    expect(savedSchool.toObject().complexes[0].zipCode).to.equal(schoolData.complexes[0].zipCode);
                    expect(savedSchool.toObject().complexes[0].city).to.equal(schoolData.complexes[0].city);
                    expect(savedSchool.toObject().complexes[0].province).to.equal(schoolData.complexes[0].province);

                    done();
                });
            });
        });

        it('Should update the address of the the first school complex', function(done) {
            schoolData.complexes[0].address = 'Largo ciaia, 30';
            school.set(schoolData);
            school.markModified('complexes');

            school.save(function(err) {
                should.not.exist(err);

                School.findOne(school._id, function(err, savedSchool) {
                    should.not.exist(err);

                    expect(savedSchool.equals(school)).to.equal(true);
                    expect(savedSchool.toObject().complexes[0].address).to.equal(schoolData.complexes[0].address);

                    done();
                });
            });
        });

        it ('Should remove the school', function(done) {
            School.findByIdAndRemove(school._id, function(err) {
                should.not.exist(err);

                School.findOne(school._id, function(err, removedSchool) {
                    should.not.exist(err);
                    should.not.exist(removedSchool);

                    done();
                });
            });
        });

        after(function(done) {
            School.remove();
            done();
        });

    });
});