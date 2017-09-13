var mongoose = require('mongoose');

// create Todo model with validation
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minLength: 1
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  // id of user who created the todo, so that user does have access to
  // manage this data
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = { Todo };
