/**
 * Module dependencies.
 */
var should = require('should'),
    expect = require('chai').expect,
    app = require('../../../server'),
    mongoose = require('mongoose'),
    AcademicYear = mongoose.model('AcademicYear');

//The tests
describe('Model AcademicYear:', function () {
    describe('Save an AcademicYear', function() {

        var id;
        var academicYearData;

        before(function() {
            academicYearData = {
                name: '2013/2014',
                startDate: 1377993600000,
                endDate: 1402358400000
            };
        });

        it('Should Save a new academic year', function(done) {
            var academicYear = new AcademicYear(academicYearData);
            academicYear.save(function(err, savedAcademicYear) {
                should.not.exist(err);
                id = savedAcademicYear._id;
                done();
            });
        });

        it('Should get the academicYearData just saved', function(done) {
            AcademicYear.findById(id, function(err, savedAcademicYear) {
                should.not.exist(err);
                expect(savedAcademicYear.name).to.equal(academicYearData.name);
                expect(savedAcademicYear.startDate.getTime()).to.equal(1377993600000);
                expect(savedAcademicYear.endDate.getTime()).to.equal(1402358400000);
                done();
            });
        });

        after(function() {
            AcademicYear.remove({});
        });

    });
});