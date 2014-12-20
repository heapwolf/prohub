var ecstatic = require('ecstatic');
var config = require('config');
var server = require('./server');

//
// pick the correct environment for the server.
//
config = config[process.env['NODE_ENV'] || 'local'];

//
// modules that are specific to http requests.
//
var requests = [
  require('home/requests'),
  require('project/requests'),
  require('gh/requests')
];

//
// modules that are specific to websocket events.
//
var events = [
  require('home/events'),
  require('project/events')
];

//
// create either an https or http server depending on if the
// pems object contains any values.
//

var assets = ecstatic({
  root: __dirname + '/assets',
  cache: 0
});

var allow = /(.*)\.css|^\/fonts\/|img\/|^\/img\/|^\/js\/|(.*)\.js|favicon.ico/;

server(events, requests, function(req, res) {

  if (req.method == 'GET' || req.method == 'HEAD') {
    if (allow.test(req.url)) {
      assets(req, res);
      return false;
    }
  }
  return true;

}).listen(config.port, config.host, function() {
  console.log('Server started [%s:%d]', 
    config.host, config.port);
});

