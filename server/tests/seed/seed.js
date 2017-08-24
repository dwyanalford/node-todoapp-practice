const {ObjectID} = require('mongodb');
const {Todo} = require('../../models/todo');
const {User} = require('../../models/user');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();


const users = [{
  _id: userOneId,
  email: 'dwyan@jwt.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: userTwoId,
  email: 'jen@basic.com',
  password: 'userTwoPass'
}];

// ADDING SOME SEED DATA
const todos = [{
  _id: new ObjectID(),
  text: 'Testing my todo part 1'
}, {
  _id: new ObjectID(),
  text: 'Testing my todo part 2',
  completed: true,
  completedAt: 333
}];

//make sure databse base is zero before performing test
// otherwise logic does not make sense below
const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then( () => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    // promise utility method, won't get fired until
    // user one and two successfully saved to database
    return Promise.all([userOne, userTwo])
  }).then( () => done());
};

module.exports = {todos, populateTodos, populateUsers, users};
