var paramify = require('paramify');
var domready = require('domready');
var reconnect = require('reconnect-engine');


var linestream = require('./linestream');
var match = paramify(document.location.pathname);

//
// almost all client side code should wait for the dom.
//
domready(function() {

  //
  // on connect, execute the current routes related functions.
  //
  var con = reconnect(function(stream) {
    linestream(stream);

    if (match('/home') || match('/'))
      return require('home/client')(stream);

    if (match('/project/:id'))
      return require('project/client')(stream);

  });

  con.connect('/server');

  //
  // TODO
  // handle UI events for disconnect/reconnect here.
  //

});

