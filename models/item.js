var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the schema of a single Item. Every "Item" must
// belongs to, at least, one Collection.
var Item = new Schema({
    name : String,
    audioURL : String,
    imageURL : String,
    created : { type: Date, default: Date.now }
});


module.exports = mongoose.model('Item', AstronautSchema);