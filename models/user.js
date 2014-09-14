var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the schema of a single Item. Every "Item" must
// belongs to, at least, one Collection.
var UserSchema = new Schema({
    username : String,
    password : String,
    photoURL : String,
    endpoint : String,
    collections : String,
    items : String,
    created : { type: Date, default: Date.now }
});

var UserModel = mongoose.model('User', UserSchema);

var debug = true;
var UserManager = {
  create: function(req, res) {
    // Necesito el endpoint
    var params = req.body;
    console.log('Estamos creando un usuario con ' + JSON.stringify(params));
    res.status(200);
  },
  delete: function() {
   
  },
  find: function(req, res) {
    // aqui vamos con las params
    var params = req.params;
    console.log('Estamos pidiendo el usuario con username ' + JSON.stringify(params));
  },
  update: function(req, res) {
   
  }
};

module.exports = UserManager;