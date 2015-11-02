var express = require('express');
var bodyParser = require('body-parser');
var db = require('./database');
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
// var pg = require('pg');

var mongoURI = process.env.MONGOLAB_URI || "mongodb://heroku_9vz179l4:al1rrd1fgc3vm1db0qbgofrna4@ds049084.mongolab.com:49084/heroku_9vz179l4";

var mongooseUri = uriUtil.formatMongoose(mongoURI);
var MongoDB = mongoose.connect(mongooseUri).connection;
MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});

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

app.post('/getCollections', function(req, res) {
  db.getCollections(req.body, function(result) {
    res.send(result);
  })
})

app.post('/addCollection', function(req, res) {
  db.addCollection(req.body, function(result) {
    res.send(result);
  })
})

app.post('/deleteCollections', function(req, res) {
  db.deleteCollections(req.body, function(result) {
    res.send(result);
  })
})

// Temporarily removed
// app.post('/addToCollection', function(req, res) {
//   db.addToCollection(req.body, function(result) {
//     res.send(result);
//   })
// })

// app.get('/db', function(req, res) {
//   db.viewDatabase(function(result) {
//     res.send(result);
//   })
// })

app.listen(process.env.PORT || 3000);
