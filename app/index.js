var config = require('config');
var server = require('./server');

//
// http request handlers
//
var requests = [
  require('home/requests'),
  require('project/requests'),
  require('gh/requests')
];

//
// websocket event handlers
//
var events = [
  require('home/events'),
  require('project/events')
];

server(events, requests)
  .listen(config.port, config.host, function() {
    console.log('Server started [%s:%d]', 
      config.host, config.port);
  });

