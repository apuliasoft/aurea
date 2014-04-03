'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  Complex = mongoose.model('Complex'),
  _ = require('lodash'),
/*jshint -W079 */ expect = require('chai').expect;

//Globals
var complex;

//The tests
describe('<Unit Test>', function() {
    describe('Model Complex:', function() {
        beforeEach(function(done) {
            complex = new Complex({
                street: 'Via Qualunque 1',
                zipCode: '12345',
                city: 'Chissadove',
                province: 'AZ'
            });

            complex.save(function(err) {
                if(err) {
                    done(err);
                }
                done();
            });
        });

        describe('Method Find', function() {
            it('should be able to find all complexs', function(done) {
                return Complex.find({}, function(err, complexs) {
                    should.not.exist(err);
                    expect(complexs.length).to.equal(1);
                    expect(complexs[0].equals(complex)).to.equal(true);
                    done();
                });
            });

            it('should be able to find a complex by id', function(done) {
                return Complex.findById(complex._id, function(err, complex) {
                    should.not.exist(err);
                    expect(complex.equals(complex)).to.equal(true);
                    done();
                });
            });
        });

        describe('Method Save', function() {
            it('should be able to save a complex', function(done) {
                return complex.save(function (err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without street', function(done) {
                complex.street = '';

                return complex.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without zip code', function(done) {
                complex.zipCode = '';

                return complex.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without city', function(done) {
                complex.city = '';

                return complex.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without province', function(done) {
                complex.province = '';

                return complex.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to update a complex', function(done) {
                var update = {
                    street: 'Via Qualunque altra 1',
                    zipCode: '54321',
                    city: 'Chissadove altro',
                    province: 'ZA'
                };
                complex = _.extend(complex, update);

                return complex.save(function(err) {
                    should.not.exist(err);

                    Complex.findOne(complex._id, function(err, complex) {
                        should.not.exist(err);

                        expect(complex.equals(complex)).to.equal(true);
                        expect(complex.street).to.equal(update.street);
                        expect(complex.zipCode).to.equal(update.zipCode);
                        expect(complex.city).to.equal(update.city);
                        expect(complex.province).to.equal(update.province);

                        done();
                    });
                });
            });
        });

        describe('Method Remove', function() {
            it('should be able to remove a complex', function(done) {
                return complex.remove(function(err) {
                    should.not.exist(err);
                    Complex.findById(complex._id, function(err, complex) {
                        should.not.exist(err);
                        should.not.exist(complex);
                        done();
                    });
                });
            });
        });

        afterEach(function(done) {
            Complex.remove().exec();
            done();
        });
        after(function(done) {
            Complex.remove().exec();
            done();
        });
    });
});