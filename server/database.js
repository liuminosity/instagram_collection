var pg = require('pg');
var request = require('request');
var auth = require('../instagramAuth.js');

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

var queryInstagram = function queryInstagram(body, cb) {
  var startTime = body.startTime;
  var endTime = body.endTime;
  var tag = body.tag;
  var accessToken = body.accessToken
  var imageArray = [];
  var apiQuery = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?access_token=' + accessToken;
  var endOfRequest = false;
  var counter = 0;
  var recursiveQuery = function recursiveQuery(queryString) {
    counter++;
    console.log('this is counter', counter, 'with queryString', queryString);
    if (counter >= 3) {
      cb(imageArray);
      return;
    }
    request.get(queryString, function(err, res, body) {
      var parsedBody = JSON.parse(body);
      var dataArray = parsedBody.data;
      for (var i = 0; i < dataArray.length; i++) {
        console.log('time after start:', dataArray[i].created_time - startTime, 'and time before end:', endTime - dataArray[i].created_time)
        if (dataArray[i].created_time < endTime) {
          if (dataArray[i].created_time > startTime) {
            console.log('internal trigger');
            imageArray.push(dataArray[i]);
          } else {
            endOfRequest = true;
            break;
          }
        }
      }
      if (!endOfRequest) {
        recursiveQuery(parsedBody.pagination.next_url)
      } else {
        cb(imageArray);
      }
    })
  };
  recursiveQuery(apiQuery);


  // request.get(apiQuery, function(err, res, body) {
  //   var parsedBody = JSON.parse(body);
  //   var dataArray = parsedBody.data;
  //   for (var i = 0; i < dataArray.length; i++) {
  //     if (dataArray[i].created_time < endTime) {
  //       if (dataArray[i].created_time > startTime) {
  //         console.log('time after start:', dataArray[i].created_time - startTime, 'and time before end:', endTime - dataArray[i].created_time)
  //         imageArray.push(dataArray[i]);
  //       } else {
  //         endOfRequest = true;
  //         break;
  //       }
  //     }
  //   }
    // console.log(dataArray.length, imageArray.length);
    
}


module.exports = {
  viewDatabase,
  queryInstagram
}
