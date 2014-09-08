// We need the crypto library in order to generate the signature properly
var crypto = require('crypto');

// This vars were set with:
// heroku config:set AWS_ACCESS_KEY=xxx AWS_SECRET_ACCESS_KEY=yyy
// heroku config:set S3_BUCKET_NAME = zzz
// Remember to check that the namespace is the same!
var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID;
var AWS_SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY;
var S3_BUCKET = process.env.S3_BUCKET_NAME


var debug = true;

var AWS = {
  getCredentials: function(req, res) {
    debug && console.log('aws:getCredentials');
    debug && console.log('AWS_ACCESS_KEY ' + AWS_ACCESS_KEY);
    debug && console.log('AWS_SECRET_KEY ' + AWS_SECRET_KEY);
    debug && console.log('S3_BUCKET ' + S3_BUCKET);
    
    var object_name = req.query.s3_object_name;
    var mime_type = req.query.s3_object_type;

    // We need an expiration time for the credentials
    var now = new Date();
    var expires = Math.ceil((now.getTime() + 100000)/1000); // 10 seconds from now
    var amz_headers = "x-amz-acl:public-read";

    var put_request = "PUT\n\n"+mime_type+"\n"+expires+"\n"+amz_headers+"\n/"+S3_BUCKET+"/"+object_name;

    var signature = crypto.createHmac('sha1', AWS_SECRET_KEY).update(put_request).digest('base64');
    signature = encodeURIComponent(signature.trim());
    // Warning! If the signature contains '+' is failing
    // TODO Consider to modify this in order to ensure that this characters
    // are not part of the signature.
    signature = signature.replace('+','%2B')
                                   .replace('/','%2F')
                                   .replace('=','%3D');


    // Create the URL of the object
    var url = 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+object_name;

    // Send the credentials back to the Client code.
    var credentials = {
        signed_request: url+"?AWSAccessKeyId="+AWS_ACCESS_KEY+"&Expires="+expires+"&Signature="+signature,
        url: url
    };

    res.json(credentials);
  }
};



module.exports = AWS;