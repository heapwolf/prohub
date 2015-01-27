var level = require('level');
var sublevel = require('level-sublevel');
var path = require('path');

var location = path.join(__dirname, '/../db');
var db = level(location, { valueEncoding: 'json' })

module.exports = sublevel(db);

