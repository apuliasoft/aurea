/**
 * Module dependencies.
 */
var should = require('should'),
    expect = require('chai').expect,
    app = require('../../../server'),
    mongoose = require('mongoose'),
    Teacher = mongoose.model('Teacher');

//The tests
describe('Teacher School:', function () {
    describe('Save a Teacher', function() {
        var id;
        var teacherData;

        before(function() {
            teacherData = {
                name: 'Nicola',
                surname: 'Sanitate'
            };
        });

        it('Should Save a new teacher', function(done) {
            var teacher = new Teacher(teacherData);
            teacher.save(function(err, savedTeacher) {
                should.not.exist(err);
                id = savedTeacher._id;
                done();
            });
        });

        it('Shoud get the teacher just saved', function(done) {
            Teacher.findById(id, function(err, savedTeacher) {
                should.not.exist(err);
                expect(savedTeacher.name).to.equal(teacherData.name);
                expect(savedTeacher.surname).to.equal(teacherData.surname);
                done();
            });
        });

        after(function() {
            Teacher.remove({});
        });

    });
});