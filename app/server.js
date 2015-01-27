var http = require('http');
var engine = require('engine.io-stream');
var split = require('split');
var github = require('gh');
var ecstatic = require('ecstatic');

var allow = /(.*)\.css|^\/fonts\/|img\/|^\/img\/|^\/js\/|(.*)\.js|favicon.ico/;

module.exports = function(events, requests) {

  var assets = ecstatic({
    root: __dirname + '/assets',
    cache: 0
  });

  function routeRequest(req, res) {

    if (req.method == 'GET' || req.method == 'HEAD') {
      if (allow.test(req.url)) {
        return assets(req, res);
      }
    }

    for (var i in requests) {
      if (requests[i].test(req, res))  {
        return requests[i].handler(req, res);
      }
    }

    res.statusCode = 404;
    res.end('Not Found');
  }

  var server = http.createServer(function(req, res) {

    github.requestAuth(req, res, function(err, token) {
      if (err) {
        req.statusCode = 501;
        return req.end('Internal Error');
      }
      routeRequest(req, res, token);
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
        .on('error', function(err) {
          console.error(err)
        })
        .pipe(split(JSON.parse))
        .on('data', function(data) {
          for(i in events) {
            if (events[i].test(stream, data, token)) {
              events[i].handler(stream, data, token);
            }
          }
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

