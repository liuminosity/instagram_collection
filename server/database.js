var sqlite3 = require('sqlite3').verbose();
var dbFile = path.join(__dirname + '/emails.db');
var db = exports.db = new sqlite3.Database(dbFile);
