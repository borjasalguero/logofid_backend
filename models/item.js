var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the schema of a single Item. Every "Item" must
// belongs to, at least, one Collection.
var ItemSchema = new Schema({
    uuid : String,
    name : String,
    audioURL : String,
    photoURL : String,
    isShareable: { type: Boolean, default: false },
    created : { type: Date, default: Date.now }
});

var ItemModel = mongoose.model('Item', ItemSchema);

var debug = true;
var ItemManager = {
  create: function(req, res) {
    debug && console.log('Lets store the item ' + JSON.stringify(req.body));
    var newItem = new ItemModel(req.body);
    newItem.save(function(e, itemCreated) {
      if(e) {
        return res.send(500, err.message);
      }
      res.status(200).jsonp(itemCreated);
    });
  },
  delete: function() {
    ItemModel.findById(
      req.body._id,
      function(err, item) {
        if (err) {
          return res.send(500, err.message);
        }
        item.remove(function(err) {
          if (err) {
            return res.send(500, err.message);
          }
          res.status(200);
        })
    });
  },
  find: function(req, res) {
    console.log('PARAMETROS DEL FIND ' + req.params.id);
    ItemModel.find(
      {
        uuid: req.params.id
      },
      function(e, items) {
        if (e) {
          res.send(500, e.message);
          return ;
        }
        console.log(JSON.stringify(items[0]));
        res.status(200).jsonp(items[0]);
      }
    );

  },
  update: function(req, res) {
    var params = req.body;
    debug && console.log('Lets update the item ' + JSON.stringify(params));
    ItemModel.findById(
      params._id,
      function(e, item) {

        if (e) {
          return res.send(500, err.message);
        }

        // Update the URLs
        item.audioURL  = params.audioURL;
        item.photoURL  = params.photoURL;
        
        // Update the ITEM
        item.save(function(e, itemCreated) {
          if (e) {
            return res.send(500, err.message);
          }
          res.status(200).jsonp(itemCreated);
        });
      }
    )
  }
};





module.exports = ItemManager;