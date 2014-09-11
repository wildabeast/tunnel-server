//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
//Error.stackTraceLimit = Infinity

module.exports = function() {

  var fs = require('fs'),
      Server = require('tls-tunnel').Server;

  var server = new Server({
    port: 3000,   // port to listen for client connections
    key: fs.readFileSync('./keys/server-key.pem'),    // server's private key
    cert: fs.readFileSync('./keys/server-cert.pem'),  // server's SSL certificate
    ca: [fs.readFileSync('./keys/client-cert.pem')],  // list of authorized client SSL certificates
    forwardedPorts: {
      start: 8081,    // Start of port range to assign to connecting clients
      count: 10       // maximum number of ports and hence clients that can be supported
    }
  });

  server.on('open', function(port) {
  	console.log('client connection opened on port ' + port + ".");
  });

  server.on('connect', function() {
  	console.log('client connected.');
  });

  server.start(function() {
    // server should be listening on port 8080 now
  	console.log('tunnel server started on port ' + 3000); 
  // server.stop(function() {
      // server should have ended all connections and stopped
    //});
  });

};