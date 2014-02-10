/**
 * Module dependencies.
 */
var should = require('should'),
    expect = require('chai').expect,
    app = require('../../../server'),
    mongoose = require('mongoose'),
    Student = mongoose.model('Student');

//The tests
describe('Model Student:', function () {
    describe('Save a Student', function() {
        var id;
        var studentData;

        before(function() {
            studentData = {
                firstName: 'Giuseppe',
                lastName: 'Santoro',
                birthDate: 1386936727000
            };
        });

        it('Should Save a new student', function(done) {
            var student = new Student(studentData);
            student.save(function(err, savedStudent) {
                should.not.exist(err);
                id = savedStudent._id;
                done();
            });
        });

        it('Shoud get the student just saved', function(done) {
            Student.findById(id, function(err, savedStudent) {
                should.not.exist(err);
                expect(savedStudent.firstName).to.equal(studentData.firstName);
                expect(savedStudent.lastName).to.equal(studentData.lastName);
                expect(savedStudent.birthDate.getTime()).to.equal(1386936727000);
                done();
            });
        });

        after(function() {
            Student.remove({});
        });

    });
});