var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the schema of a single Item. Every "Item" must
// belongs to, at least, one Collection.
var UserSchema = new Schema({
    username : String,
    password : String,
    photoURL : String,
    endpoint : String,
    collections : [],
    items : [],
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
   
  }
};

module.exports = UserManager;