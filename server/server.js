var express = require('express');
var bodyParser = require('body-parser');
var db = require('./database');
// var pg = require('pg');

var app = express();

app.use(express.static(__dirname + '/../client'));

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('hello world');
})

app.post('/timeSearch', function(req, res) {
  db.queryInstagram(req.body, function(result) {
    res.send(result);
  });
})

app.get('/db', function(req, res) {
  db.viewDatabase(function(result) {
    res.send(result);
  })
})

app.listen(process.env.PORT || 3000);
