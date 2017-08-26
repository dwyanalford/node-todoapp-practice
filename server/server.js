// root of app
const config = require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { db } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var { authenticate } = require('./middleware/middleware');


var app = express();
const port = process.env.PORT;

// config the middleware so we can send json to our express application
app.use(bodyParser.json());

// create a new todo route handler, get body data from the client
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

// to get all todos
app.get('/todos', (req, res) => {
  Todo.find().then( (todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findById(id).then( (todo) => {
  if (!todo) {
    return res.status(400).send();
  }
  res.send({ todo });
}).catch( (e) => {
  res.status(400).send();
  });
});

app.delete('/todos/:id', (req, res) => {
  //get the id
  var id = req.params.id;
  // if ObjectID is invalid send back a 404 status
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  // with mongoose function, remove the todo by ID from the mongo database
  Todo.findByIdAndRemove(id).then( (todo) => {
    // if no todo then return err status of 400
    if (!todo) {
      return res.status(404).send();
    }
    // if success, send back to client
    res.send({todo});
    //console.log('Successfully removed!', todo);
  }).catch( (e) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  // this is to get specific properties you want to user to update
  // we don't want user to update anything they choose
  // use lodash
  var body = _.pick(req.body, ['text', 'completed']);

  // if ObjectID is invalid send back a 404 status
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  // with mongoose we update the database
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({ todo });
  }).catch((e) => {
    res.status(400).send();
  })
});

// POST new user
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    // note: now only 'email' and 'password' will be avail on the body below
    var user = new User(body);

    user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
    }).catch((e) => {
      res.status(400).send(e);
    })
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// need a dedicated route for logging in users, POST /users/login
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  // defined in user.js or User model
  User.findByCredentials(body.email, body.password).then( (user) => {
    // create a new token in response to http request
    user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
    // note this catch case will trigger if no user found from user.js
  }).catch( (e) => {
    res.status(400).send();
  })
});

// this is the 'log out' route; logging out the logged in
app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`ToDoApp listening on port ${port} `);
});

// made accessible for testing purposes
module.exports = { app };
