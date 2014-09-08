// Create a HTTP server on port 8000
// Send plain text headers and 'Hello World' to each client
 
var http = require('http');
var request = require('request');
var express = require('express');

var app = express();

app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(function(req, res, next) {
  res.contentType('application/json');
  next();
});

var port = process.env.PORT || 8080;

// var mongoURL = process.env.MONGOURL || 'mongodb://127.0.0.1:27017/simplepush';
// // For running in appfog
// if (process.env.VCAP_SERVICES) {
//   var services = JSON.parse(process.env.VCAP_SERVICES);
//   mongoURL = services['mongodb-1.8'][0].credentials.url;
// }

app.set('port', port);
// app.set('mongoURL', mongoURL);

// pushClient.init(mongoURL);

// app.post('/api/v1/register', pushClient.register);
// app.post('/api/v1/unregister', pushClient.unregister);
// app.post('/api/v1/', pushClient.send);
// app.get('/api/v1/:seq', pushClient.get);


// CUIDADO! Este es peligrosete. Necesito diferenciar en el cliente
// entre POST y GET, y cambiarlo aquí a POST.
app.post('/v1/user/create', function(req, res) {
  res.send(200, {method: 'create'});
});

app.get('/v1/user/:uuid', function(req, res) {
  res.send(200, {method: 'get UUID'});
});

app.post('/v1/user/:uuid/update', function(req, res) {
  res.send(200, {method: 'update'});
});

app.post('/v1/user/:uuid/delete', function(req, res) {
  res.send(200, {method: 'delete'});
});



app.post('/v1/object/create', function(req, res) {
  res.send(200, {method: 'create'});
});

app.get('/v1/object/:uuid', function(req, res) {
  res.send(200, {method: 'get UUID'});
});

app.post('/v1/object/:uuid/update', function(req, res) {
  res.send(200, {method: 'update'});
});

app.post('/v1/object/:uuid/delete', function(req, res) {
  res.send(200, {method: 'delete'});
});






http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});


console.log('Server running at http://127.0.0.1:' + port);


