// var pg = require('pg');
var request = require('request');
var moment = require('moment');
var auth = require('../instagramAuth.js');
var User = require('./models/userModel');

// var viewDatabase = function viewDatabase(cb) {
//   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//     client.query('SELECT * FROM test_table', function(err, result) {
//       done();
//       if (err) {
//         console.log(err);
//         cb('Error: ' + err);
//       } else {
//         console.log(result);
//         cb(result);
//       }
//     })
//   })
// }

var addCollection = function addCollection(body, cb) {
  var accessToken = body.accessToken;
  var collectionData = body.collectionData;
  var collectionName = body.collectionName;
  User.findOne({'accessToken':accessToken}, 'collections', function(err, data) {
    if (err) {
      cb({
        status: 'Error',
        error: err
      });
    } else {
      if (data) {
        User.update({'accessToken':accessToken}, {$push: {'collections': {
          collectionName: collectionName,
          data: collectionData
        }}},{upsert:true}, function(err, data) {
          if (err) {
            console.log(err);
          } else {
            cb({
              status: 'Success',
              message: 'Added new collection to existing user'
            })
          }
        })
      } else {
        var newUser = new User({
          accessToken: accessToken,
          collections: [{
            collectionName: collectionName,
            data: collectionData
          }]
        });
        newUser.save(function(err, user) {
          if (err) {
            cb('error' + err);
          } else {
            cb({
              status: 'Success',
              message: 'New user detected, added user and new collection'
            });
          }
        })
        
      } 
    }
  })
}

var getCollections = function getCollections(body, cb) {
  var accessToken = body.accessToken;
  User.findOne({'accessToken':accessToken}, 'collections', function(err, collections) {
    if (err) {
      console.log('error:', err)
    } else {
      cb(collections)
    }
  })
}

var deleteCollections = function deleteCollections(body, cb) {
  var accessToken = body.accessToken;
  User.remove({'accessToken':accessToken}, function(err, result) {
    if (err) {
      console.log('error:', err)
    } else {
      // console.log(collections)
      cb('deleted')
    }
  })
}

//temporarily not used
var addToCollection = function addToCollection(body, cb) {
  var accessToken = body.accessToken;
  var collectionName = body.collectionName;
  var imageData = body.imageData;
  User.update({'accessToken':accessToken}, {$push: {'collections.data': imageData}}, {upsert:true, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      cb('added into collection' + collectionName);
    }
  }})
}

var queryInstagram = function queryInstagram(body, cb) {
  var startTime = body.startTime;
  var endTime = body.endTime;
  var tag = body.tag;
  var accessToken = body.accessToken
  var imageArray = [];
  var apiQuery = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?access_token=' + accessToken;
  var endOfRequest = false;
  
  //Variables to ensure user doesn't use too many requests for one search. Realistically, requestLimit would be higher (~100)
  var requestCounter = 0;
  var requestLimit = 5;

  var recursiveQuery = function recursiveQuery(queryString) {
    requestCounter++;
    console.log('this is requestCounter', requestCounter, 'with queryString', queryString);
    if (requestCounter >= requestLimit) {
      var message = imageArray.length === 0 ? 'No results found within API call limit, please expand date range' : 
        'API call due to internal limit. Recommend re-rerunning your search with new end date of ' + moment.unix(imageArray[imageArray.length-1].created_time).format().slice(0,10);
      cb({
        data: imageArray,
        message: message
      });
      return;
    }
    request.get(queryString, function(err, res, body) {
      var parsedBody = JSON.parse(body);
      var dataArray = parsedBody.data;
      for (var i = 0; i < dataArray.length; i++) {
        // console.log('time after start:', dataArray[i].created_time - startTime, 'and time before end:', endTime - dataArray[i].created_time)
        if (dataArray[i].created_time < endTime) {
          if (dataArray[i].created_time > startTime) {
            // console.log('internal trigger');
            imageArray.push(dataArray[i]);
          } else {
            endOfRequest = true;
            break;
          }
        }
      }
      if (!endOfRequest && parsedBody.pagination.next_url) {
        recursiveQuery(parsedBody.pagination.next_url)
      } else {
        cb({
          data: imageArray,
          message: 'All images found'
        });
      }
    })
  };
  recursiveQuery(apiQuery);
}


module.exports = {
  // viewDatabase,
  addCollection,
  getCollections,
  deleteCollections,
  addToCollection,
  queryInstagram
}
