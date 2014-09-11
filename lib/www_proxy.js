module.exports = function() {

  var aws = require('aws-sdk'),
      app = require('express')();

  aws.config.loadFromPath('./config.json');

  var s3 = new aws.S3();

  app.get('/www/:uuid', function(req, res) {

    var uuid = req.params.uuid;
    console.log('REQUEST: ' + uuid);

    // serve up uuid-www.zip
    var params = {
      Bucket: 'build.phonegap.com', 
      Key: uuid + "-www.zip"
    };

    s3.getObject(params, function(err, data) {
      if (err) {
        console.log("REQUEST: " + err.message);
        res.type('text/plain');
        res.status(404);
        res.send(null);
      } else {
        console.log("REQUEST: found " + uuid);
        res.type('application/zip'); 
        res.send(data.Body);
      }
    });

  });

  var port = process.env.PORT || 3030;
  app.listen(port);
  console.log('AWS proxy listening on port ' + port);

};