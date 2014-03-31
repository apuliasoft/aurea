'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    TimeTable = mongoose.model('TimeTable'),
/*jshint -W079 */ expect = require('chai').expect;

//Globals
var timeTable;

//The tests
describe('<Unit Test>', function() {
    describe('Model TimeTable:', function() {
        beforeEach(function(done) {

            timeTable = new TimeTable({
                days: [{
                    day: 0,
                    slots:[
                        {start:540, end: 600},
                        {start:600, end: 660}
                    ]
                },{
                    day: 1,
                    slots:[
                        {start:540, end: 600},
                        {start:600, end: 660}
                    ]
                }]
            });

            timeTable.save(function(err) {
                if(err) {
                    done(err);
                }
                done();
            });
        });

        describe('Method Find', function() {
            it('should be able to find all time tables', function(done) {
                return TimeTable.find({}, function(err, timeTables) {
                    should.not.exist(err);
                    expect(timeTables.length).to.equal(1);
                    expect(timeTables[0].equals(timeTable)).to.equal(true);
                    done();
                });
            });

            it('should be able to find a time table by id', function(done) {
                return TimeTable.findById(timeTable._id, function(err, _timeTable) {
                    should.not.exist(err);
                    expect(_timeTable.equals(_timeTable)).to.equal(true);
                    done();
                });
            });
        });

        describe('Method Save', function() {
            it('should be able to save a time table', function(done) {
                return timeTable.save(function (err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save with a day greater than 6', function(done) {
                timeTable.days[0].day = 8;

                return timeTable.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save a slot whit a wrong type', function(done) {
                timeTable.days[0].slots.push({
                    start: 10,
                    end: '10:00'
                });

                return timeTable.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to update the time table', function(done) {
                var newDay = 2;
                timeTable.days[0].day = newDay;

                return timeTable.save(function(err) {
                    should.not.exist(err);

                    TimeTable.findOne(timeTable._id, function(err, _timeTable) {
                        should.not.exist(err);

                        expect(_timeTable.equals(timeTable)).to.equal(true);
                        expect(_timeTable.days[0].day).to.equal(newDay);

                        done();
                    });
                });
            });
        });

        describe('Method Remove', function() {
            it('should be able to remove a time table', function(done) {
                return timeTable.remove(function(err) {
                    should.not.exist(err);
                    TimeTable.findById(timeTable._id, function(err, timeTables) {
                        should.not.exist(err);
                        should.not.exist(timeTables);
                        done();
                    });
                });
            });
        });

        afterEach(function(done) {
            TimeTable.remove().exec();
            done();
        });
        after(function(done) {
            TimeTable.remove().exec();
            done();
        });
    });
});