var express = require('express');
var bodyParser = require('body-parser');

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

app.listen(3000);
