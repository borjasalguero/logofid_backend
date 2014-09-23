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
    created : { type: Date, default: Date.now },
    owner: String
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
  deleteItem: function(req, res) {
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
          res.status(200).jsonp({hola: 'caracola'});
        })
    });
  },
  getAllByUser: function(req, res) {
    ItemModel.find(
      {
        owner: req.params.username
      },
      function(e, items) {
        if (e || items.length === 0) {
          return res.send(500, 'No item found');
        }
        res.status(200).jsonp(items);
      }
    );
  },
  find: function(req, res) {
    ItemModel.find(
      {
        uuid: req.params.id
      },
      function(e, items) {
        if (e || items.length === 0) {
          return res.send(500, 'No item found');
        }
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