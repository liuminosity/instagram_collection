var request = require('request');
var moment = require('moment');
var auth = require('../instagramAuth.js');
var User = require('./models/userModel');

//Adds a collection to a user's collections. If the user is not found, assumes that it is a new user and creates a new user
//Either way, adds the user into the database. Used in /addCollection endpoint
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

//Gets all of the user's collections. Used in /getCollections endpoint
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

//Deletes a user, effectively deleting all of their collections. Not used
var deleteCollections = function deleteCollections(body, cb) {
  var accessToken = body.accessToken;
  User.remove({'accessToken':accessToken}, function(err, result) {
    if (err) {
      console.log('error:', err)
    } else {
      cb('deleted')
    }
  })
}

//Add images to an existing collection. Not used
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

//Queries Instagram, repeatedly sends requests to Instagram until either the artificial requestLimit is hit, or the date exceeds the date range
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

  //Recursive function that repeatedly paginates through Instagram queries until either the artificial requestLimit is hit, or the date exceeds the date range
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
        if (dataArray[i].created_time < endTime) {
          if (dataArray[i].created_time > startTime) {
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
  addCollection,
  getCollections,
  deleteCollections,
  addToCollection,
  queryInstagram
}
