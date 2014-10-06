'use strict';

module.exports = {
    db: 'mongodb://localhost/aurea-dev',
    app: {
        name: 'Aurea: un registro elettronico aperto - Development'
    },
    mailer: {
        host: '',
        port: 25,
        secureConnection: false,
        name: 'Aurea-dev',
        auth: {
            user: '',
            pass: ''
        },
        maxConnections: 5
    }
};
