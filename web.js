// Main code of our server

// Needed for creating the server. We will specify the
// port and the server is running as expected!
var http = require('http');
// Library needed for adding request to the server. With this
// we can route POST/GET... requests to the right handler.
var express = require('express');

// Needed as a connector for our DB in MongoDB
var mongoose = require('mongoose');

// Needed in order to avoid the Cross Domain or CORS
var cors = require('cors');

// Wrapper for our communication with AWS.
// We will need it in order to publish our images to a public
// storage.
var aws = require('./aws/aws.js');
var itemManager = require('./models/item.js');
var userManager = require('./models/user.js');

// Let's create the app based on 'express'
var app = express();
app.use(cors()); // Enable cors module
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());


// As we will deploy in Heroku or similar, we will get the
// port defined in the enviroment, or the 8080 by default
var port = process.env.PORT || 8080;
app.set('port', port);

// Connect with the DB. As before, we need to connect it with
// the right ENV params, based on the platform to deploy.
app.db = mongoose.connect(process.env.MONGOLAB_URI);

// Add the differents routes. When we request a GET/POST... from our
// client we want to route it to the right handler.
app.get('/sign_s3', aws.getCredentials);

app.get('/api/v1/users/:id', userManager.find);
app.post('/api/v1/users/create', userManager.create);

app.post('/api/v1/item/create', itemManager.create);
app.post('/api/v1/item/update', itemManager.update);
app.post('/api/v1/item/delete', itemManager.delete);
app.get('/api/v1/item/uuid/:id', itemManager.find);

// Boot server in the right port
http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
