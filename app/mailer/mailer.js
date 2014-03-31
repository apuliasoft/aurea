'use strict';

var nodemailer = require('nodemailer'),
  config = require('../../config/config');

// crea un metodo transport riutilizzabile (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport('SMTP',{
    host: config.mailer.host,
    port: config.mailer.port,
    secureConnection: config.mailer.secureConnection,
    name: config.mailer.name,
    auth: {
        user: config.mailer.auth.user,
        pass: config.mailer.auth.pass
    },
    maxConnections: config.mailer.maxConnections
});

module.exports.sendEmail = function (from, to, subject, content, callback) {

    // setto le opzioni della mail -- supporta unicode
    var mailOptions = {
        from: from, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: content // html body
    };

    // manda la mail con il transport dedicato
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            return callback(error);
        }

        return callback(null, response.message);

        // Se non vuoi più usare  questo oggetto transport, decommenta la riga seguente
        // smtpTransport.close(); // shut down the connection pool, no more messages
    });

};