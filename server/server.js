var express = require('express');
var bodyParser = require('body-parser');
// var db = require('./database');
var pg = require('pg');

var app = express();

app.use(express.static(__dirname + '/../client'));

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('hello world');
})

app.post('/timeSearch', function(req, res) {
  console.log(req.body);
  res.send('sup');
})

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
})

app.listen(process.env.PORT || 3000);
