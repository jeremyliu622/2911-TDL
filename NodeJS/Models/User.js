var mongoose              = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

// User Schema
var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    index:true // Index ensures property is unique in db.
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
      type: String,
      required: true
  },

});
userSchema.plugin(passportLocalMongoose);
var User = module.exports = mongoose.model('User', userSchema, 'users');
module.exports = User;
