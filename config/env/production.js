'use strict';

module.exports = {
//    db: process.env.MONGOHQ_URL,
    db: 'mongodb://localhost/aurea-dev',
    app: {
        name: 'Aurea: un registro elettronico aperto - Production'
    },
    mailer: {
        host: '',
        port: 25,
        secureConnection: false,
        name: 'Aurea',
        auth: {
            user: '',
            pass: ''
        },
        maxConnections: 5
    }
};
