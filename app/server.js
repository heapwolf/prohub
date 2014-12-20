var http = require('http');
var engine = require('engine.io-stream');
var split = require('split');
var parse = require('through-parse');
var github = require('gh');

module.exports = function(events, requests, cb) {

  function routeRequest(req, res) {
    if (!cb(req, res)) return;

    for(i in requests)
      if (requests[i].test(req, res))
        requests[i].handler(req, res);
  }

  var server = http.createServer(function(req, res) {

    var that = this;
    var args = [].slice.call(arguments);

    github.requestAuth(req, res, function(err, token) {
      if (err) {
        req.statusCode = 501;
        return req.end('Internal Error');
      }
      args.push(token);
      routeRequest.apply(that, args);
    });
  });

  function routeEvent(stream) {

    github.socketAuth(stream, function(err, token) {
      var write = stream.write;

      stream.write = function() {
        if (typeof arguments[0] == 'object') {
          arguments[0] = JSON.stringify(arguments[0]) + '\n';
        }
        write.apply(stream, arguments);
      };

      if (err) {
        return stream.write({ error: err.message });
      }

      stream
        .pipe(split())
        .pipe(parse())
        .on('data', function(data) {
          for(i in events)
            if (events[i].test(stream, data, token))
              events[i].handler(stream, data, token);
        });
    });
  }

  //
  // if there are events, attach the websocket server.
  //
  if (events && events.length)
    engine(routeEvent).attach(server, '/server');

  return server;
};

