var mongoose = require('mongoose');
var simplePush = require('../simple_push/simple_push.js');

var Schema = mongoose.Schema;

// Define the schema of a single Item. Every "Item" must
// belongs to, at least, one Collection.
var UserSchema = new Schema({
    username : String,
    password : String,
    photoURL : String,
    endpoint : String,
    pushversion : { type: Number, default: 1 },
    collections : [],
    notifications : [],
    created : { type: Date, default: Date.now }
});

var UserModel = mongoose.model('User', UserSchema);

var debug = true;
var UserManager = {
  create: function(req, res) {

    var newUser = new UserModel(req.body);
    newUser.save(function(e, userCreated) {
      if(e) {
        return res.send(500, err.message);
      }
      res.status(200).jsonp(userCreated);
    });
  },
  notify: function(req, res) {
    var params = req.body;
    UserModel.find(
      {
        username: params.username
      },
      function(e, users) {
        if (e || users.length === 0) {
          return res.send(500, 'No user found');
        }
        users[0].notifications.push(params);
        users[0].pushversion++;
        users[0].save(function(e, user) {
          if (e) {
            return res.send(500, err.message);
          }
          console.log('---- ACTUALIZADO ---- ');
          console.log('Vamos a enviar un push a ' + users[0].endpoint);
          console.log('Con version ' + users[0].pushversion);
          simplePush.notify(users[0].pushversion, users[0].endpoint);
          // Enviar push

          res.status(200).jsonp({status: 'notified'});
        });
      }
    );
  },
  getNotifications: function(req, res) {
    UserModel.find(
      {
        username: req.params.username
      },
      function(e, users) {
        if (e || users.length === 0) {
          return res.send(500, 'No user found');
        }
        
        res.status(200).jsonp(users[0].notifications);
        users[0].notifications = [];
        users[0].save();
      }
    );
  },
  delete: function() {
   
  },
  find: function(req, res) {
    UserModel.find(
      {
        username: req.params.username
      },
      function(e, users) {
        if (e || users.length === 0) {
          return res.send(500, 'No user found');
        }
        res.status(200).jsonp(users[0]);
      }
    );
  },
  update: function(req, res) {
    console.log('Vamos a requestear al usuario ' + req.params.username);
    console.log('Vamos a requestear al usuario ' + req.params.endpoint);
    UserModel.find(
      {
        username: req.params.username
      },
      function(e, users) {
        if (e || users.length === 0) {
          console.log('NO HAY USUARIO CON ESOS DATOS PARA ACTUALIZAR');
          return res.send(500, 'No user found');
        }
        console.log('Tenemos usuario ' + JSON.stringify(users[0]));
        users[0].endpoint = req.params.endpoint;
        users[0].save(function(e, user) {
          if (e) {
            console.log('ERROR AL HACER UN SAVE');
            return res.send(500, err.message);
          }
          res.status(200).jsonp(user);
        });
      }
    );
  }
};

module.exports = UserManager;