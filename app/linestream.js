var split = require('split');

module.exports = function Linestream(stream) {

  stream
    .pipe(split(JSON.parse))
    .on('data', function(d) {
      stream.emit('json', d);
    });

  var write = stream.write;

  stream.write = function() {
    if (typeof arguments[0] == 'object') {
      arguments[0] = JSON.stringify(arguments[0]) + '\n';
    }
    write.apply(stream, arguments);
  };

  return stream;
};

