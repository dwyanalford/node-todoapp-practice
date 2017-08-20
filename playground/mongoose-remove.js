const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// to remove everything from the database, get nothing back except
// confirmation count of all documents removed
// Todo.remove({}).then( (result) => {
//   console.log(result);
// });

// here with these you do get something back, even though it will remove it,
// atleast you can print to screen or send to client
// Todo.findOneAndRemove
// Todo.findByIdAndRemove

// if you need to query with another property other than id
Todo.findOneAndRemove({_id:'5999a80564eb5d6650dfb940}'}).then( (todo) => {
  console.log(todo);
});

//Todo.findByIdAndRemove
Todo.findByIdAndRemove('5999a80564eb5d6650dfb940').then( (todo) => {
  console.log(todo);
});
