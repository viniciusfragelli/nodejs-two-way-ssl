#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('certificado:server');

// var http = require('http');
// var http = require('http');
// var port = normalizePort(process.env.PORT || '3000');
// app.set('port', port);
// var server = http.createServer(app);
// server.listen(port);

//HTTPS
const https = require('https');
const fs = require('fs');

var server = https.createServer({
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt'),
  ca: [ fs.readFileSync('./ca.crt') ],
  requestCert: true,
  rejectUnauthorized:true,
  agent: false
}, app);

server.listen(443, function(){
  console.log("info",'Server is running https at port : ' + 443);
});

server.on('error', onError);
server.on('listening', onListening);


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
