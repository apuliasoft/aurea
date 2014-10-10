var mongoose = require('mongoose');
require('./app/models/user.js');
var User = mongoose.model('User');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Initializing system variables
var config = require('./config/config');

// Bootstrap db connection
var db = mongoose.connect(config.db, function (err) {
    //db.connection.db.dropDatabase(function (err) {
        User.findOne(
          {email: 'admin@aurea.it'},
          function (err, user) {
              if (user) {
                  db.connection.close();
                  return;
              }

              var admin = new User();
              admin.name = 'admin';
              admin.email = 'admin@aurea.it';
              admin.password = 'admin';
              admin.role = 'admin';

              admin.save(function () {
                  db.connection.close();
                  console.log('ATTENZIONE: E\' fortemente consigliato di eliminare questo file dopo averlo eseguito');
              });
          }
        );
    //});
});





