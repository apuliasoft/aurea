'use strict';

module.exports = {
    db: 'mongodb://' + (process.env.MONGO_PORT_27017_TCP_ADDR ? process.env.MONGO_PORT_27017_TCP_ADDR : 'localhost') + 'aurea-test',
    port: 3001,
    app: {
        name: 'Aurea: un registro elettronico aperto - Test'
    },
    mailer: {
        host: '',
        port: 25,
        secureConnection: false,
        name: 'Aurea-test',
        auth: {
            user: '',
            pass: ''
        },
        maxConnections: 5
    }
};
