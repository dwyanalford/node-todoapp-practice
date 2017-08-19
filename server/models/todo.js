const mongoose = require('mongoose');

// create Todo model with validation
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minLength: 1,
    trim: true  // remove leading and trailing spaces
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
});

module.exports = {Todo};
