var mongoose = require('mongoose');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Initializing system variables
var config = require('./config/config');

// Bootstrap db connection
var db = mongoose.connect(config.db);

require('./app/models/user.js');
var User = mongoose.model('User');

db.connection.db.dropDatabase();

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

      admin.save(function(){
          db.connection.close();
      });
  }
);