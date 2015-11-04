var express = require('express');
var bodyParser = require('body-parser');
var db = require('./database');
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');

//Set up MongoDB url, links to online db
var mongoURI = process.env.MONGOLAB_URI || "mongodb://heroku_9vz179l4:al1rrd1fgc3vm1db0qbgofrna4@ds049084.mongolab.com:49084/heroku_9vz179l4";

//Open connection to MongoDB
var mongooseUri = uriUtil.formatMongoose(mongoURI);
var MongoDB = mongoose.connect(mongooseUri).connection;
MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});

var app = express();

app.use(express.static(__dirname + '/../client'));

app.use(bodyParser.json());

//Test url
app.get('/', function(req, res) {
  res.send('hello world');
})

/**************************************************
* /timeSearch endpoint requires the following parameters:
*   "startTime" - start time in unix (string)
*   "endTime" - end time in unix (string)
*   "tag" - requested tag to search for (string)
*   "accessToken" - user's Instagram access token (string)
* 
* Responds with an object:
* {
*   data: [image1, image2, ...],
*   message: "message"
* }
**************************************************/
app.post('/timeSearch', function(req, res) {
  db.queryInstagram(req.body, function(result) {
    res.send(result);
  });
})

/**************************************************
* /getCollections endpoint requires the following parameters:
*   "accessToken" - user's Instagram access token (string)
* 
* Responds with an object:
* {
*   collections: 
*     [{collectionName: "string", 
*       data: [image1, image2, ...]
*     }, ... ] 
* }
**************************************************/
app.post('/getCollections', function(req, res) {
  db.getCollections(req.body, function(result) {
    console.log(result);
    res.send(result);
  })
})

/**************************************************
* /addCollection endpoint requires the following parameters:
*   "collectionData" - array of images [image1, image2, ...] 
*   "collectionName" - name of collection (string)
*   "accessToken" - user's Instagram access token (string)
* 
* Responds with an object:
* {
*   status: "success",
*   message: "message"
* }
**************************************************/
app.post('/addCollection', function(req, res) {
  db.addCollection(req.body, function(result) {
    res.send(result);
  })
})

//Not used...yet
app.post('/deleteCollections', function(req, res) {
  db.deleteCollections(req.body, function(result) {
    res.send(result);
  })
})

app.listen(process.env.PORT || 3000);
