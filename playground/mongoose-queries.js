const {ObjectID} = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');

var id = '5998d23daab9600b206d0aee';

if (!ObjectID.isValid(id)) {
  console.log('ID not valid');
}

Todo.findOne({
  _id: id
}).then( (todo) => {
  return console.log('Todo, ', todo);
});

Todo.find({
  _id: id
}).then( (todos) => {
  return console.log('Todos, ', todos);
});

Todo.findById(id).then( (todo) => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo by id, ', todo);
}).catch( (e) => console.log(e));
