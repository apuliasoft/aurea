/**
 * Module dependencies.
 */
var should = require('should'),
    expect = require('chai').expect,
    app = require('../../../server'),
    mongoose = require('mongoose'),
    SchoolClass = mongoose.model('SchoolClass');

//The tests
describe('Model SchoolClass:', function () {
    describe('Save a SchoolClass', function() {
        var id;
        var schoolClassData;

        before(function() {
            schoolClassData = {
                name: '1A'
            };
        });

        it('Should Save a new schoolClass', function(done) {
            var schoolClass = new SchoolClass(schoolClassData);
            schoolClass.save(function(err, savedSchoolClass) {
                should.not.exist(err);
                id = savedSchoolClass._id;
                done();
            });
        });

        it('Shoud get the schoolClass just saved', function(done) {
            SchoolClass.findById(id, function(err, savedSchoolClass) {
                should.not.exist(err);
                expect(savedSchoolClass.name).to.equal(schoolClassData.name);
                done();
            });
        });

        after(function() {
            SchoolClass.remove({});
        });

    });
});