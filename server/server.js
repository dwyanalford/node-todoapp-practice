// root of app
var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { db } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

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
      return res.status(400).send();
    }
    // if success, send back to client
    res.send(todo);
    //console.log('Successfully removed!', todo);
  }).catch( (e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started listening on port ${port} `);
});

// made accessible for testing purposes
module.exports = { app };
