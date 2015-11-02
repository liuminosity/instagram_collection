var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  accessToken: {
    type: String,
    required: true,
    unique: true
  },
  userName: String,
  collections: Array
});

var User = mongoose.model('User', userSchema);

module.exports = User;
