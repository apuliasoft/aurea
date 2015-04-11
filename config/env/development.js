'use strict';

module.exports = {
    db: 'mongodb://' + (process.env.MONGO_PORT_27017_TCP_ADDR ? process.env.MONGO_PORT_27017_TCP_ADDR : 'localhost') + 'aurea-dev',
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
