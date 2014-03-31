'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mailer = require('../../../app/mailer/mailer');

describe('<Unit Test>', function () {
    describe.skip('Module mailer:', function () {
        describe('Method sendMail', function () {

            // il timeout standard e' di 2 sec
            it('Should send an email', function(done){
                mailer.sendEmail('stocazzo', 'n.sanitate@gmail.com', 'prova', '<b>Questa è una prova</b>', function (err, response) {
                    console.log(response);
                    should.not.exist(err);
                    done();
                });
            });
        });
    });
});