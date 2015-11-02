var pg = require('pg');

var viewDatabase = function viewDatabase(cb) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROm test_table', function(err, result) {
      done();
      if (err) {
        console.log(err);
        cb('Error: ' + err);
      } else {
        console.log(result);
        cb(result);
      }
    })
  })
}

module.exports = {
  viewDatabase
}
