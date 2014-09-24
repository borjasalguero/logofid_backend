// We need the crypto library in order to generate the signature properly
var request = require('request');

var debug = true;

var SimplePush = {
  notify: function(version, endpoint) {
    request(
      {
        method: 'PUT',
        uri: endpoint,
        body: 'version=' + version,
      }, function onRequest(error, response, body) {
        if (error) {
          console.log('Error: Push message was not sent');
          return;
        }
        console.log('Push message sent');
      }
    );
  }
};



module.exports = SimplePush;