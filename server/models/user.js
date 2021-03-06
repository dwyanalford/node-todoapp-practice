const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs'); // one way

// we need this to attach custom instance methods for, which we need
// for authentication - creating tokens
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      isAsync: true,
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
  },
    token: {
      type: String,
      required: true
    }
  }]
});


// override a method to customise how mongoose does things
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

// instance method 'generateAuthToken' does have access to this document
// because we need info to generate a json web token
// not an arrow function because it does not 'bind' a 'this' keyword
UserSchema.methods.generateAuthToken  = function () {
  var user = this;
  var access = 'auth';
  // generate the token - make sure to require 'jwt' above, takes 2 arguments
  // the data you want to sign and the password
  var token = jwt.sign({ _id: user._id.toHexString(), access}, 'abc123').toString();

  // update user array tokens with properties you pull out of object
  user.tokens.push({access, token});
  // use 'return' below to chain another 'then' callback in server.js
  // to allow server.js to chain on to the Promise
  return user.save().then( () => {
    return token;
  });
};

UserSchema.methods.removeToken = function (token) {
  // use mongodb '$pull' operator to remove items from an array that
  // match certain criteria
  var user = this;

  // use 'return' to chain to call in server.js
  return user.update({
    $pull: {
      tokens: {token}
      }
  });
};

// this is a model method not instance method so use 'Capital letter: User'
UserSchema.statics.findbyToken = function (token) {
  var User = this;
  var decoded; // to store 'jwt' values

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject('Authenication Denied. Please Sign up');
  }
  //Success
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
};


UserSchema.statics.findByCredentials = function(email, password) {
  // find user where email equals email sent
  var User = this;

  return User.findOne({email}).then( (user) => {
    if (!user) {
      // return a rejected Promise
      return Promise.reject();
    }

    return new Promise( (resolve, reject) => {
      // compare user with password
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

// must provide 'next' argument and must call in the callback
UserSchema.pre('save', function(next){
  var user = this;

  if (user.isModified('password')) {
      bcrypt.hash(user.password, 10, (err, hash) => {
        // we want the hash to be the password, so we override here
        user.password = hash;
        next();
      });
  } else {
    next();
  }
});

// create User model with validation
var User = mongoose.model('User', UserSchema);

module.exports = { User };
