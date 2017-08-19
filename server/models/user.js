const mongoose = require('mongoose');

// create User model with validation
var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minLength: 1,
    trim: true  // remove leading and trailing spaces
  }
});

module.exports = {User};
