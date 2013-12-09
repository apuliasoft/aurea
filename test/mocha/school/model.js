/**
 * Module dependencies.
 */
var should = require('should'),
    app = require('../../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    School = mongoose.model('School');

//Globals
var school;

//The tests
describe('<Unit Test>', function () {
    describe('Model School:', function () {
        beforeEach(function (done) {
            school = new School({
                name: 'Istito Tecnico'
            });
            done();
        });

        describe('Method Save', function () {
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
        });

        afterEach(function (done) {
            School.remove({});
            done();
        });
        after(function (done) {
            School.remove().exec();
            done();
        });
    });
});